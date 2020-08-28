import { formatNumber } from './number';

export const formatCurrency = (
  value: number | string,
  maxDecimal = 0,
  minDecimal = 0
): string | null => {
  const formattedValue = formatNumber(value, maxDecimal, minDecimal);
  if (formattedValue === null) {
    return null;
  }

  return `R$ ${formattedValue}`;
};
