import pt from '../dictionaries/pt.json';
import en from '../dictionaries/en.json';

const dicts = { pt, en };

export function getDictionary(lang) {
  return dicts[lang] || dicts.pt;
}

export const LANGS = ['pt', 'en'];
