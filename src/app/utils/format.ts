import { Lang, dictionaries } from '../i18n/strings';

export function formatPrice(value: number): string {
  return `TZS ${value.toLocaleString('en-US')}`;
}

export function formatType(type: 'edp' | 'oil' | 'mist', lang: Lang = 'en'): string {
  const d = dictionaries[lang] ?? dictionaries.en;
  if (type === 'edp') return d.typeEdp;
  if (type === 'oil') return d.typeOil;
  return d.typeMist;
}
