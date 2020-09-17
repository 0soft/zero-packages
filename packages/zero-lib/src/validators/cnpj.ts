const createCnpj = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') {
    return false;
  }

  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  // Valida DVs
  let tamanho: number = cnpj.length - 2;
  let numeros: any = cnpj.substring(0, tamanho);
  let soma: any = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  const resultados = [0, 0];
  resultados[0] = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultados[1] = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultados;
};

export const validateCnpj = (cnpj: any) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  const tamanho = cnpj.length - 2;
  const digitos = cnpj.substring(tamanho);
  const resultados = createCnpj(cnpj);
  if (resultados) {
    if (resultados[0] !== parseInt(digitos.charAt(0), 10)) {
      return false;
    }
    if (resultados[1] !== parseInt(digitos.charAt(1), 10)) {
      return false;
    }
    return true;
  }
  return false;
};
