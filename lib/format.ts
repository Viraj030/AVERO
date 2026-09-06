export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function formatDecimal(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function classNames(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(' ');
}
