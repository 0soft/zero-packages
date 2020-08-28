import { formatNumber } from './number';

export const formatDistance = (value: number | string): string | null => {
  if (typeof value !== 'number') {
    value = parseFloat(value) || 0;
  }

  let symbol = 'm';
  if (value >= 1000) {
    symbol = 'Km';
    value = value / 1000;
  }

  const intValue = Math.round(value);
  return `${intValue === value ? intValue : formatNumber(value, 2, 2)}${symbol}`;
};
