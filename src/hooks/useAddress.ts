import { useState } from 'react';
import { fetchAddressByCEP } from '@/lib/cepApi';
import {CepResponse} from "@/models/Cep";

export function useAddress() {
    const [address, setAddress] = useState<CepResponse>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchAddress = async (cep: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAddressByCEP(cep);
            if ('erro' in result) {
                throw new Error('CEP não encontrado');
            }
            setAddress(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { address, loading, error, searchAddress };
}
