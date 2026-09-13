import { Lang, StringKey, dictionaries } from '../i18n/strings';
import { ProductType } from '../types';

export function formatPrice(value: number): string {
  return `TZS ${value.toLocaleString('en-US')}`;
}

/**
 * Every concentration is listed explicitly. The previous version fell through
 * to "Body mist" for anything it did not recognise, so adding a type to the
 * catalogue without touching this file would have labelled an Armaf eau de
 * toilette a body mist on the live site — wrong, and wrong quietly.
 */
const TYPE_KEYS: Record<ProductType, StringKey> = {
  edp: 'typeEdp',
  edt: 'typeEdt',
  extrait: 'typeExtrait',
  oil: 'typeOil',
  mist: 'typeMist',
};

export function formatType(type: ProductType, lang: Lang = 'en'): string {
  const d = dictionaries[lang] ?? dictionaries.en;
  return d[TYPE_KEYS[type]] ?? type;
}
