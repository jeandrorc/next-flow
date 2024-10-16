import { useState, useEffect } from 'react';
import {Movie} from "@/models";
import {fetchMovieByYear} from "@/lib";


export function useMovieByYear(year: number) {
    const [data, setData] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovieByYear = async () => {
            setLoading(true);
            setError(null);

            try {
                const movieData = await fetchMovieByYear(year);
                setData(movieData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMovieByYear();
    }, [year]);

    return { data, loading, error };
}
