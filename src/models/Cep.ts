// models/cep.ts
export interface CepResponse {
  bairro: string;
  cep: string;
  complemento: string | null;
  ddd: string;
  estado: string;
  gia: string | null;
  ibge: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  siafi: string;
  uf: string;
  unidade: string | null;
}
