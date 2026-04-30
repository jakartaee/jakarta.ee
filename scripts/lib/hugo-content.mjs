/**
 * hugo-content.mjs — Hugo content directory utilities.
 *
 * Shared helpers for walking the content/ tree, resolving source files,
 * and mapping file paths to base keys and languages.
 */

import { readdir, access } from 'node:fs/promises';
import { join, extname } from 'node:path';

export const CONTENT_DIR = 'content';

/** Directories under content/ that never contain translatable pages. */
export const DEFAULT_EXCLUDES = new Set([
  'templates', 'xml', 'schemas', 'images', 'documents',
]);

/**
 * Recursively walk a directory and yield all file paths.
 *
 * @param {string} dir       Directory to walk.
 * @param {Set<string>} excludes  Top-level folder names to skip.
 * @returns {AsyncGenerator<string>}
 */
export async function* walk(dir, excludes = DEFAULT_EXCLUDES) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = fullPath.replace(CONTENT_DIR + '/', '');
      const topLevel = rel.split('/')[0];
      if (excludes.has(topLevel)) continue;
      yield* walk(fullPath, excludes);
    } else {
      yield fullPath;
    }
  }
}

/**
 * Return the "base key" — file path without language suffix or extension.
 * Used to group translations of the same page together.
 *
 * Examples:
 *   content/about/faq/index.md      → content/about/faq/index
 *   content/about/faq/index.ja.md   → content/about/faq/index
 */
export function toBaseKey(filePath) {
  const ext = extname(filePath);                     // .md or .html
  const withoutExt = filePath.slice(0, -ext.length);
  return withoutExt.replace(/\.(ja|zh)$/, '');
}

/**
 * Extract the language code from a file path, or 'en' for English sources.
 */
export function extractLang(filePath) {
  const ext = extname(filePath);
  const withoutExt = filePath.slice(0, -ext.length);
  const match = withoutExt.match(/\.(ja|zh)$/);
  return match ? match[1] : 'en';
}

/**
 * Given a page key (e.g. "mentorship/index"), find the English source file.
 * Checks .md then .html extensions.
 */
export async function resolveSourceFile(pageKey, contentDir = CONTENT_DIR) {
  const base = join(contentDir, pageKey);
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
 * Derive the translated file path from a source path and target lang.
 * e.g. content/mentorship/index.md + ja → content/mentorship/index.ja.md
 */
export function deriveTargetPath(sourcePath, lang) {
  return sourcePath.replace(/(\.[a-z]+)$/, `.${lang}$1`);
}
