import { formatCpf } from './cpf';
import { formatCurrency } from './currency';
import { formatDate } from './date';
import { formatDistance } from './distance';
import { formatDocument } from './documents';
import { formatNumber } from './number';
import { formatPercentage } from './percentage';
import { formatPhone } from './phone';
import { formatRegex } from './regex';
import { truncString } from './truncate';
import { formatZipcode } from './zipcode';

export const formatter = {
  cpf: formatCpf,
  currency: formatCurrency,
  date: formatDate,
  distance: formatDistance,
  document: formatDocument,
  number: formatNumber,
  percentage: formatPercentage,
  phone: formatPhone,
  regex: formatRegex,
  truncateString: truncString,
  zipcode: formatZipcode,
};

export default formatter;
