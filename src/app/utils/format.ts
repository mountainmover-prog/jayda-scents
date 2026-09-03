export function formatPrice(value: number): string {
  return `TZS ${value.toLocaleString('en-US')}`;
}

export function formatType(type: 'edp' | 'oil'): string {
  return type === 'edp' ? 'Eau de Parfum' : 'Perfume Oil';
}
