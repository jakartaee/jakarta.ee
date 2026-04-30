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
 *
 * Scoping:
 *   --section blogs              Only scan content/blogs/
 *   --section blogs,news,learn   Comma-separated list of sections
 *   --path learn/starter-guides  Only pages whose key starts with this prefix
 *   --limit 10                   Cap output to first N results
 */

import { extname } from 'node:path';
import {
  CONTENT_DIR, DEFAULT_EXCLUDES,
  walk, toBaseKey, extractLang,
} from './lib/hugo-content.mjs';

// ── Configuration ──────────────────────────────────────────────────────────

/** Language codes to check against the English source. */
const ALL_LANGS = ['ja', 'zh'];

// ── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const langsArg = getFlag('--langs');
const targetLangs = langsArg ? langsArg.split(',').map(l => l.trim()) : ALL_LANGS;

const missingOnlyArg = getFlag('--missing-only');
const jsonOutput = args.includes('--json');

const excludeArg = getFlag('--exclude');
const extraExcludes = excludeArg ? excludeArg.split(',').map(e => e.trim()) : [];
const EXCLUDES = new Set([...DEFAULT_EXCLUDES, ...extraExcludes]);

// Scoping flags
const sectionArg = getFlag('--section');
const sections = sectionArg ? new Set(sectionArg.split(',').map(s => s.trim())) : null;

const pathPrefix = getFlag('--path');

const limitArg = getFlag('--limit');
const limit = limitArg ? parseInt(limitArg, 10) : Infinity;

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  /** @type {Map<string, Set<string>>} baseKey → Set of present languages */
  const pageMap = new Map();

  for await (const filePath of walk(CONTENT_DIR, EXCLUDES)) {
    const ext = extname(filePath);
    if (ext !== '.md' && ext !== '.html') continue;

    // Section filter: compare the first path segment under content/
    if (sections) {
      const rel = filePath.replace(CONTENT_DIR + '/', '');
      const topSection = rel.split('/')[0];
      if (!sections.has(topSection)) continue;
    }

    const key = toBaseKey(filePath);
    const lang = extractLang(filePath);

    if (!pageMap.has(key)) pageMap.set(key, new Set());
    pageMap.get(key).add(lang);
  }

  // Build report: only pages that have an English source
  let results = [];

  for (const [key, langs] of pageMap.entries()) {
    if (!langs.has('en')) continue;

    const pageRelative = key.replace(CONTENT_DIR + '/', '');

    // Path-prefix filter
    if (pathPrefix && !pageRelative.startsWith(pathPrefix)) continue;

    const missing = targetLangs.filter(l => !langs.has(l));

    if (missingOnlyArg) {
      if (!langs.has(missingOnlyArg)) {
        results.push({ page: pageRelative, missing: [missingOnlyArg], present: [...langs] });
      }
    } else {
      if (missing.length > 0) {
        results.push({ page: pageRelative, missing, present: [...langs] });
      }
    }
  }

  // Sort by page path
  results.sort((a, b) => a.page.localeCompare(b.page));

  // Apply limit
  if (results.length > limit) {
    results = results.slice(0, limit);
  }

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
