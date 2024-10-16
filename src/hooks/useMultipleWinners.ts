import { useState, useEffect } from 'react';
import {fetchMultipleWinners} from "@/lib";
import {MultipleWinnersResponse} from "@/models";

export function useMultipleWinners() {
    const [data, setData] = useState<MultipleWinnersResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMultipleWinners = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fetchMultipleWinners();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMultipleWinners();
    }, []);

    return { data, loading, error };
}
