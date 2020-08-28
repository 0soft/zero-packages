import { formatters, validators, validate as validateFunc, ValidateOption } from 'validate.js';
import dayjs from 'dayjs';

formatters.custom = (errors: any[]) => {
  return errors.reduce((acc, error) => {
    if (!acc.hasOwnProperty(error.attribute)) {
      if (error.validator === 'equality') {
        acc[error.attribute] = error.globalOptions.t('validation::general__equality', {
          origin: error.globalOptions.t(`validation::fields__${error.options}`),
          field: error.globalOptions.t(`validation::fields__${error.attribute}`),
        });
      } else {
        acc[error.attribute] = error.globalOptions.t(`validation::general__${error.validator}`, {
          options: error.options,
        });
      }
    }
    return acc;
  }, {});
};

validators.phone = (value: any) => {
  return /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/.test(
    value
  )
    ? null
    : 'Not a valid phone';
};

validators.arrayPresence = (value: any) =>
  value != null && Array.isArray(value) && value.length > 0 ? null : 'Not a valid list';

validators.cardValid = (value: any) =>
  dayjs(value, 'MM/YY').isAfter(dayjs(), 'day') ? null : 'Not a valid date';

export const validate = (attributes: any, constraints: any, options?: ValidateOption | any) => {
  const validation = validateFunc(attributes, constraints, { format: 'custom', ...options });
  return validation;
};

export const finalFormValidate = (constraints: any, options?: ValidateOption) => (values: any) =>
  validate(values, constraints, options);
