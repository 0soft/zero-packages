import { validateCpf } from '../validators/cpf';
import { validateCnpj } from '../validators/cnpj';

export const formatDocument = (value: string) => {
  if (validateCpf(value)) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  } else if (validateCnpj(value)) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }
  return value;
};
