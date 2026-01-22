import { TEXTS } from '../constants';
import { Language } from '../types';

export const t = (key: keyof typeof TEXTS.EN, lang: Language) => {
  // Check if translation exists for language, otherwise fallback to EN
  if (TEXTS[lang] && TEXTS[lang][key]) {
    return TEXTS[lang][key];
  }
  return TEXTS['EN'][key] || key;
};