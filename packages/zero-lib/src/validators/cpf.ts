import { modulo11 } from '../modulo11';

function createCpf(strCPF: string) {
  strCPF = strCPF.replace(/[^\d]+/g, '');
  if (strCPF === '00000000000') {
    return false;
  }

  const restos = [modulo11(strCPF, 9, 11), modulo11(strCPF, 10, 12)];

  return restos;
}

// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
export function validateCpf(strCPF: any) {
  strCPF = strCPF.replace(/[^\d]+/g, '');
  if (strCPF.length !== 11) {
    return false;
  }
  const restos = createCpf(strCPF);

  // @ts-ignore
  if (restos[0] !== parseInt(strCPF.substring(9, 10), 10)) {
    return false;
  }

  // @ts-ignore
  if (restos[1] !== parseInt(strCPF.substring(10, 11), 10)) {
    return false;
  }
  return true;
}
