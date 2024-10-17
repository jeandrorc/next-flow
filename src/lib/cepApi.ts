import {CepResponse} from "@/models/Cep";

interface CepErrorResponse {
  erro: boolean;
}

export async function fetchAddressByCEP(cep: string): Promise<CepResponse | CepErrorResponse> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  return response.json();
}
