import { formatRegex } from './regex';

export const formatPhone = (value: any) =>
  formatRegex(
    value,
    val =>
      val.length >= 13 ? /\+?(\d{2})(\d{2})(\d{5})(\d{4})/gi : /(\d{2})(\d{2})(\d{4})(\d{4})/gi,
    '+$1 ($2) $3-$4'
  );
