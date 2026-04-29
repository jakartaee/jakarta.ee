#!/usr/bin/env node
/**
 * find-missing-translations.mjs
 *
 * Scans the content/ directory and reports pages that are missing one or more
 * language translations.
 *
 * Hugo multilingual content translation convention:
 *   English (source): content/path/to/page/index.md
 *   Japanese:         content/path/to/page/index.ja.md
 *   Chinese:          content/path/to/page/index.zh.md
 *
 * Usage:
 *   node scripts/find-missing-translations.mjs
 *   node scripts/find-missing-translations.mjs --langs ja,zh
 *   node scripts/find-missing-translations.mjs --missing-only ja
 *   node scripts/find-missing-translations.mjs --json
 *   node scripts/find-missing-translations.mjs --exclude templates,xml
 */

import { readdir, stat } from 'node:fs/promises';
import { join, basename, dirname, extname } from 'node:path';

// ── Configuration ──────────────────────────────────────────────────────────

const CONTENT_DIR = 'content';

/** Language codes to check against the English source. */
const ALL_LANGS = ['ja', 'zh'];

/** Directories under content/ that contain no translatable pages. */
const DEFAULT_EXCLUDES = new Set(['templates', 'xml', 'schemas', 'images', 'documents']);

// ── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const langsArg = getFlag('--langs');
const targetLangs = langsArg ? langsArg.split(',').map(l => l.trim()) : ALL_LANGS;

const missingOnlyArg = getFlag('--missing-only'); // e.g. --missing-only ja
const jsonOutput = args.includes('--json');

const excludeArg = getFlag('--exclude');
const extraExcludes = excludeArg ? excludeArg.split(',').map(e => e.trim()) : [];
const EXCLUDES = new Set([...DEFAULT_EXCLUDES, ...extraExcludes]);

// ── File collection ────────────────────────────────────────────────────────

/**
 * Recursively walk a directory and yield all file paths.
 * @param {string} dir
 * @returns {AsyncGenerator<string>}
 */
async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip excluded top-level dirs
      const rel = fullPath.replace(CONTENT_DIR + '/', '');
      const topLevel = rel.split('/')[0];
      if (EXCLUDES.has(topLevel)) continue;
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

/**
 * Given a file path, return the "base key" — the path without language suffix
 * and without extension, used to group translations together.
 *
 * Examples:
 *   content/about/faq/index.md      → content/about/faq/index
 *   content/about/faq/index.ja.md   → content/about/faq/index  (same key)
 *   content/_index.zh.html          → content/_index
 *   content/specs/xml-binding/3.0/changelog.ja.md → ...changelog
 */
function toBaseKey(filePath) {
  const ext = extname(filePath);                     // .md or .html
  const withoutExt = filePath.slice(0, -ext.length); // strip .md/.html
  // Strip optional language suffix: .ja .zh etc.
  return withoutExt.replace(/\.(ja|zh)$/, '');
}

/**
 * Extract the language code from a file path, or 'en' for English sources.
 */
function extractLang(filePath) {
  const ext = extname(filePath);
  const withoutExt = filePath.slice(0, -ext.length);
  const match = withoutExt.match(/\.(ja|zh)$/);
  return match ? match[1] : 'en';
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  /** @type {Map<string, Set<string>>} baseKey → Set of present languages */
  const pageMap = new Map();

  for await (const filePath of walk(CONTENT_DIR)) {
    const ext = extname(filePath);
    if (ext !== '.md' && ext !== '.html') continue;

    const key = toBaseKey(filePath);
    const lang = extractLang(filePath);

    if (!pageMap.has(key)) pageMap.set(key, new Set());
    pageMap.get(key).add(lang);
  }

  // Build report: only pages that have an English source
  const results = [];

  for (const [key, langs] of pageMap.entries()) {
    if (!langs.has('en')) continue; // skip orphaned translations without English source

    const missing = targetLangs.filter(l => !langs.has(l));

    if (missingOnlyArg) {
      // Only report pages missing the specific language
      if (!langs.has(missingOnlyArg)) {
        results.push({ page: key.replace(CONTENT_DIR + '/', ''), missing: [missingOnlyArg], present: [...langs] });
      }
    } else {
      if (missing.length > 0) {
        results.push({ page: key.replace(CONTENT_DIR + '/', ''), missing, present: [...langs] });
      }
    }
  }

  // Sort by page path
  results.sort((a, b) => a.page.localeCompare(b.page));

  if (jsonOutput) {
    process.stdout.write(JSON.stringify(results, null, 2) + '\n');
    return;
  }

  // ── Human-readable output ───────────────────────────────────────────────

  if (results.length === 0) {
    console.log('✓ All pages have translations for: ' + targetLangs.join(', '));
    return;
  }

  // Group by which languages are missing
  const byMissing = new Map();
  for (const r of results) {
    const key = r.missing.sort().join('+');
    if (!byMissing.has(key)) byMissing.set(key, []);
    byMissing.get(key).push(r.page);
  }

  console.log(`\nMissing translations  (checking: ${targetLangs.join(', ')})\n`);
  console.log(`Total pages with gaps: ${results.length}\n`);

  for (const [missingKey, pages] of [...byMissing.entries()].sort()) {
    const langs = missingKey.split('+');
    console.log(`── Missing [${langs.join(', ')}] (${pages.length} page${pages.length > 1 ? 's' : ''}) ──`);
    for (const page of pages) {
      console.log(`   ${page}`);
    }
    console.log('');
  }

  // Summary per language
  console.log('Summary:');
  for (const lang of targetLangs) {
    const count = results.filter(r => r.missing.includes(lang)).length;
    console.log(`  ${lang}: ${count} missing`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
