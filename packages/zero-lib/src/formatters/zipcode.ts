import { formatRegex } from './regex';

export const formatZipcode = (value: any) => formatRegex(value, /(\d{5})(\d{3})/gi, '$1-$2');
