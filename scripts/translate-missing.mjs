#!/usr/bin/env node
/**
 * translate-missing.mjs
 *
 * Translates missing Hugo content pages via the DeepL CLI (`python3 -m deepl`).
 * Install: pip3 install deepl
 *
 * Designed to be piped from find-missing-translations.mjs:
 *
 *   node scripts/find-missing-translations.mjs --json \
 *     | DEEPL_AUTH_KEY=<key> node scripts/translate-missing.mjs --lang ja
 *
 * Or run standalone for a single page:
 *   DEEPL_AUTH_KEY=<key> node scripts/translate-missing.mjs --lang zh --page mentorship/index
 *
 * Required env var:
 *   DEEPL_AUTH_KEY=<your-key>    (same key used by the deepl CLI)
 *
 * Flags:
 *   --lang <code>            target language (ja or zh), required
 *   --page <path>            single page key (e.g. mentorship/index), bypasses stdin
 *   --dry-run                show what would be translated, do not call DeepL or write files
 *   --force                  overwrite existing translation files
 *   --no-body                translate front matter only, skip body prose
 */

import { readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import yaml from 'yaml';

// ── Constants ──────────────────────────────────────────────────────────────

const CONTENT_DIR = 'content';

/**
 * Front matter fields whose string values should be sent to DeepL.
 * Everything else (dates, booleans, paths, class names, layout refs…) is kept verbatim.
 */
const TRANSLATABLE_FM_FIELDS = new Set([
  'title',
  'headline',
  'subtitle',
  'description',
  'seo_title',
  'seo_description',
]);

/**
 * Front matter field names whose VALUES are always structural (never translate).
 * Used for nested objects like `links[*]` where some sub-keys are text.
 */
const TRANSLATABLE_FM_LINK_SUBFIELDS = new Set(['text']);

/** DeepL language codes map from Hugo lang → DeepL target lang */
const DEEPL_LANG_MAP = {
  ja: 'JA',
  zh: 'ZH-HANS', // Simplified Chinese
};

// ── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] ?? null : null;
}

const targetLang = getFlag('--lang');
const pageArg = getFlag('--page');
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const noBody = args.includes('--no-body');

if (!targetLang) {
  console.error('Error: --lang <code> is required (e.g. --lang ja)');
  process.exit(1);
}

if (!DEEPL_LANG_MAP[targetLang]) {
  console.error(`Error: unsupported lang "${targetLang}". Supported: ${Object.keys(DEEPL_LANG_MAP).join(', ')}`);
  process.exit(1);
}

const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
if (!dryRun && !DEEPL_AUTH_KEY) {
  console.error('Error: DEEPL_AUTH_KEY environment variable is required (or use --dry-run)');
  process.exit(1);
}

// ── Front matter parser ────────────────────────────────────────────────────

/**
 * Split raw file content into { frontMatter: string, body: string, ext: string }.
 * Handles both `---` YAML and `+++` TOML delimiters.
 */
function splitFrontMatter(raw) {
  const match = raw.match(/^(-{3}|\+{3})\n([\s\S]*?)\n\1\n?([\s\S]*)$/);
  if (!match) return { frontMatter: '', body: raw, delimiter: '---' };
  return { frontMatter: match[2], body: match[3], delimiter: match[1] };
}

/**
 * Parse a YAML front matter string into a JS object.
 * Returns null for TOML (`+++`) or malformed YAML.
 */
function parseFrontMatter(fmStr, delimiter) {
  if (delimiter === '+++') return null; // TOML not supported
  try {
    return yaml.parse(fmStr) ?? {};
  } catch {
    return null;
  }
}

/**
 * Collect all translatable string values from a parsed front matter object.
 * Returns an array of { path: (string|number)[], value: string } where `path`
 * can be used with setByPath() to write the translated value back.
 *
 * Rules:
 *   - Top-level keys in TRANSLATABLE_FM_FIELDS → translate the string value
 *   - `links` items → translate sub-keys in TRANSLATABLE_FM_LINK_SUBFIELDS
 */
function collectTranslatableFields(obj) {
  const fields = [];
  if (!obj || typeof obj !== 'object') return fields;

  for (const [key, value] of Object.entries(obj)) {
    if (TRANSLATABLE_FM_FIELDS.has(key)) {
      if (typeof value === 'string' && value.trim()) {
        fields.push({ path: [key], value });
      }
    } else if (key === 'links' && Array.isArray(value)) {
      // Hugo links can be [ [{href:…},{text:…},{class:…}], … ] (array-of-arrays)
      // or [ {href:…, text:…}, … ] (flat array). Both are walked here.
      value.forEach((item, i) => {
        const entries = Array.isArray(item) ? item : [item];
        entries.forEach((entry, j) => {
          if (entry && typeof entry === 'object') {
            for (const [subKey, subVal] of Object.entries(entry)) {
              if (TRANSLATABLE_FM_LINK_SUBFIELDS.has(subKey) &&
                  typeof subVal === 'string' && subVal.trim()) {
                const path = Array.isArray(item)
                  ? ['links', i, j, subKey]
                  : ['links', i, subKey];
                fields.push({ path, value: subVal });
              }
            }
          }
        });
      });
    }
  }
  return fields;
}

/**
 * Set a value in a nested object/array by a path array.
 * e.g. setByPath(obj, ['links', 0, 1, 'text'], 'translated')
 */
function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}

// ── Body segmentation ──────────────────────────────────────────────────────

/**
 * Split a content body into translatable/non-translatable chunks.
 *
 * Non-translatable (preserved verbatim):
 *   - Hugo shortcodes: {{< ... >}} and {{% ... %}}
 *   - Go template actions: {{ ... }}
 *   - Fenced code blocks: ```...```
 *   - Inline code: `...`
 *   - HTML comments: <!-- ... -->
 *   - Empty body / shortcode-only bodies
 *
 * Returns an array of { type: 'text'|'preserve', content }.
 * The caller replaces 'preserve' chunks with placeholders before sending to DeepL.
 */
function segmentBody(body) {
  const chunks = [];
  // Pattern matches non-translatable regions in priority order
  const preservePattern = /(`{3,}[\s\S]*?`{3,}|`[^`\n]+`|\{\{[%<][\s\S]*?[%>]\}\}|\{\{[\s\S]*?\}\}|<!--[\s\S]*?-->)/g;

  let lastIndex = 0;
  let match;
  while ((match = preservePattern.exec(body)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ type: 'text', content: body.slice(lastIndex, match.index) });
    }
    chunks.push({ type: 'preserve', content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < body.length) {
    chunks.push({ type: 'text', content: body.slice(lastIndex) });
  }

  return chunks;
}

/**
 * Returns true if the body contains no meaningful translatable prose —
 * only shortcodes, whitespace, and HTML comments.
 */
function isBodyPureShortcodes(body) {
  const stripped = body
    .replace(/\{\{[%<][\s\S]*?[%>]\}\}/g, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  return stripped.length === 0;
}

/**
 * Wrap body for DeepL translation: replace non-translatable chunks with
 * `<deepl-ignore id="N"/>` XML tags, which DeepL will preserve unchanged.
 * Returns { wrapped: string, placeholders: string[] }.
 */
function wrapBodyForDeepL(chunks) {
  const placeholders = [];
  const parts = chunks.map(chunk => {
    if (chunk.type === 'preserve') {
      const id = placeholders.length;
      placeholders.push(chunk.content);
      return `<deepl-ignore id="${id}"/>`;
    }
    return chunk.content;
  });
  return { wrapped: parts.join(''), placeholders };
}

/**
 * Restore DeepL placeholders back into the translated body.
 */
function restoreBodyPlaceholders(translated, placeholders) {
  return translated.replace(/<deepl-ignore id="(\d+)"\/>/g, (_, id) => {
    return placeholders[parseInt(id, 10)] ?? '';
  });
}

// ── DeepL CLI ──────────────────────────────────────────────────────────────

/**
 * Translate a single string via `python3 -m deepl text`.
 * Text is passed via stdin to avoid shell-quoting issues with special characters.
 *
 * @param {string} text
 * @param {'xml'|'html'|null} tagHandling
 * @returns {string}
 */
function translateOne(text, tagHandling = null) {
  const deeplLang = DEEPL_LANG_MAP[targetLang];
  const cliArgs = [
    '-m', 'deepl', 'text',
    '--from', 'EN',
    '--to', deeplLang,
  ];
  if (tagHandling) {
    cliArgs.push('--tag-handling', tagHandling);
    cliArgs.push('--ignore-tags', 'deepl-ignore');
  }
  cliArgs.push('-'); // read from stdin

  const result = execFileSync('python3', cliArgs, {
    input: text,
    encoding: 'utf8',
    env: { ...process.env, DEEPL_AUTH_KEY },
  });

  return result.trim();
}

// ── File source resolution ─────────────────────────────────────────────────

/**
 * Given a page key (e.g. "mentorship/index"), find the English source file path.
 * The key may map to index.md, index.html, _index.md, _index.html, etc.
 */
async function resolveSourceFile(pageKey) {
  const base = join(CONTENT_DIR, pageKey);
  for (const ext of ['.md', '.html']) {
    const candidate = base + ext;
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }
  return null;
}

/**
 * Derive the output translated file path from a source file path and target lang.
 * e.g. content/mentorship/index.md + ja → content/mentorship/index.ja.md
 */
function deriveTargetPath(sourcePath, lang) {
  return sourcePath.replace(/(\.[a-z]+)$/, `.${lang}$1`);
}

// ── Single-page translation ────────────────────────────────────────────────

async function translatePage(pageKey) {
  const sourcePath = await resolveSourceFile(pageKey);
  if (!sourcePath) {
    console.warn(`  ⚠ source file not found for: ${pageKey}`);
    return;
  }

  const isHtmlSource = sourcePath.endsWith('.html');
  const targetPath = deriveTargetPath(sourcePath, targetLang);

  // Check if target already exists
  if (!force) {
    try {
      await access(targetPath);
      console.log(`  → skip (exists): ${targetPath}`);
      return;
    } catch {}
  }

  const raw = await readFile(sourcePath, 'utf8');
  const { frontMatter: fmStr, body, delimiter } = splitFrontMatter(raw);

  // ── Parse front matter ─────────────────────────────────────────────────
  const fmDoc = parseFrontMatter(fmStr, delimiter);
  if (!fmDoc && fmStr) {
    console.warn(`  ⚠ could not parse front matter for ${pageKey} — FM kept verbatim`);
  }
  const fmFields = fmDoc ? collectTranslatableFields(fmDoc) : [];

  // ── Body ───────────────────────────────────────────────────────────────
  let wrappedBody = null;
  let bodyPlaceholders = [];
  const hasTranslatableBody = !noBody && body.trim().length > 0 && !isBodyPureShortcodes(body);

  if (hasTranslatableBody) {
    const chunks = segmentBody(body);
    const wrapped = wrapBodyForDeepL(chunks);
    wrappedBody = wrapped.wrapped;
    bodyPlaceholders = wrapped.placeholders;
  }

  // ── Dry run report ─────────────────────────────────────────────────────
  if (dryRun) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`  Page   : ${pageKey}`);
    console.log(`  Source : ${sourcePath}`);
    console.log(`  Target : ${targetPath}`);
    console.log(`\n  Front matter (${fmFields.length} translatable field${fmFields.length !== 1 ? 's' : ''}):`);
    for (const { path, value } of fmFields) {
      const preview = value.length > 80 ? value.slice(0, 77) + '…' : value;
      console.log(`    [FM] ${path.join('.')} = ${preview}`);
    }
    if (hasTranslatableBody) {
      console.log(`\n  Body: prose detected — ${bodyPlaceholders.length} shortcode/code regions preserved`);
      for (const p of bodyPlaceholders.slice(0, 4)) {
        console.log(`    [SKIP] ${(p.length > 70 ? p.slice(0, 67) + '…' : p).replace(/\n/g, '↵')}`);
      }
      if (bodyPlaceholders.length > 4) console.log(`    … and ${bodyPlaceholders.length - 4} more`);
    } else {
      console.log(`\n  Body: pure shortcodes / empty — skipped`);
    }
    return;
  }

  // ── Translate FM ───────────────────────────────────────────────────────
  if (fmDoc && fmFields.length > 0) {
    try {
      for (const field of fmFields) {
        // html tag-handling preserves inline HTML in values like subtitle/headline
        const translated = translateOne(field.value, 'html');
        setByPath(fmDoc, field.path, translated);
      }
    } catch (err) {
      console.error(`  ✗ DeepL FM error for ${pageKey}: ${err.message}`);
      return;
    }
  }

  // ── Translate body ─────────────────────────────────────────────────────
  let translatedBody = body;
  if (hasTranslatableBody) {
    try {
      // xml for .md (shortcode placeholders), html for .html bodies
      const tagMode = isHtmlSource ? 'html' : 'xml';
      const translatedWrapped = translateOne(wrappedBody, tagMode);
      translatedBody = restoreBodyPlaceholders(translatedWrapped, bodyPlaceholders);
    } catch (err) {
      console.error(`  ✗ DeepL body error for ${pageKey}: ${err.message}`);
      return;
    }
  }

  // ── Serialize front matter ─────────────────────────────────────────────
  let serializedFm = fmStr ?? '';
  if (fmDoc) {
    // lineWidth: 0 disables line wrapping for long values
    serializedFm = yaml.stringify(fmDoc, { lineWidth: 0 }).trimEnd();
  }

  // ── Write output ───────────────────────────────────────────────────────
  const output = `${delimiter}\n${serializedFm}\n${delimiter}\n${translatedBody}`;
  mkdirSync(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, output, 'utf8');
  console.log(`  ✓ wrote: ${targetPath}`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  let pages;

  if (pageArg) {
    // Single page mode
    pages = [{ page: pageArg, missing: [targetLang] }];
  } else {
    // Read JSON from stdin (piped from find-missing-translations.mjs --json)
    const stdin = await readStdin();
    if (!stdin.trim()) {
      console.error('No input. Pipe from find-missing-translations.mjs --json or use --page.');
      process.exit(1);
    }
    pages = JSON.parse(stdin);
    // Filter to only pages missing the requested language
    pages = pages.filter(p => p.missing.includes(targetLang));
  }

  if (pages.length === 0) {
    console.log(`No pages missing "${targetLang}" translations.`);
    return;
  }

  console.log(`${dryRun ? '[DRY RUN] ' : ''}Translating ${pages.length} page(s) → ${targetLang.toUpperCase()}`);

  for (const { page } of pages) {
    process.stdout.write(`• ${page} `);
    await translatePage(page);
  }

  if (dryRun) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`\nDry run complete. Run without --dry-run to translate.`);
  }
}

function readStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) { resolve(''); return; }
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
