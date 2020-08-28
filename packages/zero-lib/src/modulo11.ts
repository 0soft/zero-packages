export const modulo11 = (str: string, size: number, mod: number) => {
  let soma = 0;
  for (let i = 1; i <= size; i++) {
    soma = soma + parseInt(str.substring(i - 1, i), 10) * (mod - i);
  }
  let resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  return resto;
};
