import { validateCpf } from './cpf';
import { validateCnpj } from './cnpj';
import { validateCreditCard } from './credit-card';
import { validateDate } from './date';
import { validateEmail } from './email';
import { validatePhone } from './phone';
import { validateZipcode } from './zipcode';

export const validators = {
  cpf: validateCpf,
  cnpj: validateCnpj,
  creditCard: validateCreditCard,
  date: validateDate,
  email: validateEmail,
  phone: validatePhone,
  zipcode: validateZipcode,
};

export default validators;
