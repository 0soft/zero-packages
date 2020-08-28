import { formatCurrency } from './currency';
import { formatDate } from './date';
import { formatDistance } from './distance';
import { formatDocument } from './documents';
import { formatNumber } from './number';
import { formatPercentage } from './percentage';
import { truncString } from './truncate';

export const formatter = {
  currency: formatCurrency,
  date: formatDate,
  distance: formatDistance,
  document: formatDocument,
  number: formatNumber,
  percentage: formatPercentage,
  truncateString: truncString,
};

export default formatter;
