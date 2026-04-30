/**
 * frontmatter.mjs — Hugo front matter parsing and field extraction.
 */

import yaml from 'yaml';

/**
 * Front matter fields whose string values should be sent to DeepL.
 * Everything else (dates, booleans, paths, class names, layout refs…) is kept verbatim.
 */
export const TRANSLATABLE_FM_FIELDS = new Set([
  'title',
  'headline',
  'subtitle',
  'description',
  'summary',
  'tagline',
  'custom_jumbotron',
  'seo_title',
  'seo_description',
]);

/**
 * Sub-keys inside `links` arrays that contain translatable text.
 */
export const TRANSLATABLE_FM_LINK_SUBFIELDS = new Set(['text']);

/**
 * Split raw file content into { frontMatter, body, delimiter }.
 * Handles both `---` (YAML) and `+++` (TOML) delimiters.
 */
export function splitFrontMatter(raw) {
  const match = raw.match(/^(-{3}|\+{3})\n([\s\S]*?)\n\1\n?([\s\S]*)$/);
  if (!match) return { frontMatter: '', body: raw, delimiter: '---' };
  return { frontMatter: match[2], body: match[3], delimiter: match[1] };
}

/**
 * Parse a YAML front matter string into a JS object.
 * Returns null for TOML (`+++`) or malformed YAML.
 */
export function parseFrontMatter(fmStr, delimiter) {
  if (delimiter === '+++') return null; // TOML not supported
  try {
    return yaml.parse(fmStr) ?? {};
  } catch {
    return null;
  }
}

/**
 * Serialize a front matter object back to YAML.
 * lineWidth: 0 prevents line wrapping for long values.
 */
export function stringifyFrontMatter(fmDoc) {
  return yaml.stringify(fmDoc, { lineWidth: 0 }).trimEnd();
}

/**
 * Collect all translatable string values from a parsed front matter object.
 * Returns an array of { path: (string|number)[], value: string }.
 *
 * Rules:
 *   - Top-level keys in TRANSLATABLE_FM_FIELDS → translate the string value
 *   - `links` items → translate sub-keys in TRANSLATABLE_FM_LINK_SUBFIELDS
 */
export function collectTranslatableFields(obj) {
  const fields = [];
  if (!obj || typeof obj !== 'object') return fields;

  for (const [key, value] of Object.entries(obj)) {
    if (TRANSLATABLE_FM_FIELDS.has(key)) {
      if (typeof value === 'string' && value.trim()) {
        fields.push({ path: [key], value });
      }
    } else if (key === 'links' && Array.isArray(value)) {
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
export function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}
