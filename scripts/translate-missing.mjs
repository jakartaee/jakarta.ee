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
import { dirname } from 'node:path';
import { mkdirSync } from 'node:fs';

import {
  splitFrontMatter, parseFrontMatter, stringifyFrontMatter,
  collectTranslatableFields, setByPath,
} from './lib/frontmatter.mjs';

import {
  segmentBody, isBodyPureShortcodes,
  wrapBodyForDeepL, restoreBodyPlaceholders,
} from './lib/body.mjs';

import { DEEPL_LANG_MAP, translateOne } from './lib/deepl.mjs';
import { resolveSourceFile, deriveTargetPath } from './lib/hugo-content.mjs';

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
  const deeplOpts = { targetLang, authKey: DEEPL_AUTH_KEY };

  if (fmDoc && fmFields.length > 0) {
    try {
      for (const field of fmFields) {
        const translated = translateOne(field.value, { ...deeplOpts, tagHandling: 'html' });
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
      const tagMode = isHtmlSource ? 'html' : 'xml';
      const translatedWrapped = translateOne(wrappedBody, { ...deeplOpts, tagHandling: tagMode });
      translatedBody = restoreBodyPlaceholders(translatedWrapped, bodyPlaceholders);
    } catch (err) {
      console.error(`  ✗ DeepL body error for ${pageKey}: ${err.message}`);
      return;
    }
  }

  // ── Serialize front matter ─────────────────────────────────────────────
  let serializedFm = fmStr ?? '';
  if (fmDoc) {
    serializedFm = stringifyFrontMatter(fmDoc);
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
    pages = [{ page: pageArg, missing: [targetLang] }];
  } else {
    const stdin = await readStdin();
    if (!stdin.trim()) {
      console.error('No input. Pipe from find-missing-translations.mjs --json or use --page.');
      process.exit(1);
    }
    pages = JSON.parse(stdin);
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
