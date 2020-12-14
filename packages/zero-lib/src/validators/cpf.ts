import { modulo11 } from '../modulo11';

const createCpf = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  const restos = [modulo11(cpf, 9, 11), modulo11(cpf, 10, 12)];
  return restos;
};

// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
export const validateCpf = (cpf: any) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) {
    return false;
  }
  const restos = createCpf(cpf);
  if (restos) {
    if (restos[0] !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }
    if (restos[1] !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }
    return true;
  }
  return false;
};
