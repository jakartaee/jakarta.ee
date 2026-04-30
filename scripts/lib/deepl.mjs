/**
 * deepl.mjs — DeepL CLI wrapper.
 *
 * Translates text via `python3 -m deepl text` (from the `deepl` pip package).
 * Text is passed via stdin to avoid shell-quoting issues.
 */

import { execFileSync } from 'node:child_process';

/** DeepL language codes map from Hugo lang → DeepL target lang */
export const DEEPL_LANG_MAP = {
  ja: 'JA',
  zh: 'ZH-HANS',
};

/**
 * Translate a single string via the DeepL CLI.
 *
 * @param {string} text          Text to translate.
 * @param {object} options
 * @param {string} options.targetLang  Hugo language code (e.g. 'ja', 'zh').
 * @param {string} options.authKey     DeepL API auth key.
 * @param {'xml'|'html'|null} [options.tagHandling]  Tag-handling mode.
 * @returns {string}  Translated text.
 */
export function translateOne(text, { targetLang, authKey, tagHandling = null }) {
  const deeplLang = DEEPL_LANG_MAP[targetLang];
  if (!deeplLang) {
    throw new Error(`Unsupported lang "${targetLang}". Supported: ${Object.keys(DEEPL_LANG_MAP).join(', ')}`);
  }

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
    env: { ...process.env, DEEPL_AUTH_KEY: authKey },
  });

  return result.trim();
}
