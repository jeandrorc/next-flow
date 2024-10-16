import { useState, useEffect } from 'react';
import {StudiosWithWinCountResponse} from "@/models";
import {fetchStudios} from "@/lib/fetchStudios";


export function useStudiosWithWinCount(limit = 3) {
    const [data, setData] = useState<StudiosWithWinCountResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudiosWithWinCount = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fetchStudios();
                const topStudios = result.studios
                    .sort((a, b) => b.winCount - a.winCount)
                    .slice(0, limit);

                setData({ studios: topStudios });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadStudiosWithWinCount();
    }, []);

    return { data, loading, error };
}
