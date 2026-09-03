export function formatPrice(value: number): string {
  return `TZS ${value.toLocaleString('en-US')}`;
}
