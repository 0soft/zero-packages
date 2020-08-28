import { formatNumber } from './number';

export const formatPercentage = (value: number, maxDecimal = 0, minDecimal = 0): string | null => {
  const formattedValue = formatNumber(value * 100, maxDecimal, minDecimal);
  if (formattedValue === null) {
    return null;
  }

  return `${formattedValue}%`;
};
