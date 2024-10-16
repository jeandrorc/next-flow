import { useState, useEffect } from 'react';
import {WinIntervalResponse} from "@/models";
import {fetchWinIntervals} from "@/lib/fetchWinIntervals";


export function useWinIntervals() {
    const [data, setData] = useState<WinIntervalResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWinIntervals = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fetchWinIntervals();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadWinIntervals();
    }, []);

    return { data, loading, error };
}
