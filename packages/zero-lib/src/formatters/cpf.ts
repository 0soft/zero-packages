import { formatRegex } from './regex';

export const formatCpf = (value: any) =>
  formatRegex(value, /(\d{3})(\d{3})(\d{3})(\d{2})/gi, '$1.$2.$3-$4');
