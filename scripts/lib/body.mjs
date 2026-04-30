/**
 * body.mjs — Body segmentation and DeepL XML wrapping/unwrapping.
 *
 * Splits markdown/HTML body content into translatable prose vs.
 * non-translatable regions (code blocks, shortcodes, template actions,
 * HTML comments) and provides XML-safe wrapping for DeepL's XML mode.
 */

/**
 * Split a content body into translatable/non-translatable chunks.
 *
 * Non-translatable (preserved verbatim):
 *   - Fenced code blocks: ```...```
 *   - Inline code: `...`
 *   - Hugo shortcodes: {{< ... >}} and {{% ... %}}
 *   - Go template actions: {{ ... }}
 *   - HTML comments: <!-- ... -->
 *
 * Returns an array of { type: 'text'|'preserve', content }.
 */
export function segmentBody(body) {
  const chunks = [];
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
export function isBodyPureShortcodes(body) {
  const stripped = body
    .replace(/\{\{[%<][\s\S]*?[%>]\}\}/g, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  return stripped.length === 0;
}

/**
 * Wrap body chunks for DeepL translation.
 *
 * Replaces non-translatable chunks with `<deepl-ignore id="N"/>` XML tags
 * and XML-escapes prose sections so that bare `&`, `<`, `>` in markdown
 * don't break the XML parser.  Use {@link restoreBodyPlaceholders} to undo.
 *
 * Returns { wrapped: string, placeholders: string[] }.
 */
export function wrapBodyForDeepL(chunks) {
  const placeholders = [];
  // Pass 1: replace preserved regions with null-byte temp markers so that
  // the XML-escaping pass (Pass 2) doesn't touch them.
  const MARKER = '\x00DEEPL';
  const MARKER_END = '\x00';
  const withMarkers = chunks.map(chunk => {
    if (chunk.type === 'preserve') {
      const id = placeholders.length;
      placeholders.push(chunk.content);
      return `${MARKER}${id}${MARKER_END}`;
    }
    return chunk.content;
  }).join('');

  // Pass 2: escape XML-special characters in prose sections only.
  const escaped = withMarkers
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Pass 3: replace temp markers with real `<deepl-ignore>` XML tags.
  const wrapped = escaped.replace(/\x00DEEPL(\d+)\x00/g, (_, id) => {
    return `<deepl-ignore id="${id}"/>`;
  });

  return { wrapped, placeholders };
}

/**
 * Restore DeepL placeholders back into the translated body, undoing the
 * XML escaping applied in {@link wrapBodyForDeepL}.
 */
export function restoreBodyPlaceholders(translated, placeholders) {
  const MARKER = '\x00RESTORE';
  const MARKER_END = '\x00';
  // Pass 1: replace placeholder tags with temp markers (before unescaping).
  let result = translated.replace(/<deepl-ignore id="(\d+)"\s*\/>/g, (_, id) => {
    return `${MARKER}${id}${MARKER_END}`;
  });
  // Pass 2: unescape XML entities in prose sections.
  result = result
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  // Pass 3: restore original placeholder content.
  result = result.replace(/\x00RESTORE(\d+)\x00/g, (_, id) => {
    return placeholders[parseInt(id, 10)] ?? '';
  });
  return result;
}
