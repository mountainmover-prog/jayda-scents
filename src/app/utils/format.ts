export function formatPrice(value: number): string {
  return `TZS ${value.toLocaleString('en-US')}`;
}

export function formatType(type: 'edp' | 'oil' | 'mist'): string {
  if (type === 'edp') return 'Eau de Parfum';
  if (type === 'oil') return 'Perfume Oil';
  return 'Body Mist';
}
