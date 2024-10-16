import { useState, useEffect } from 'react';
import { fetchMovies } from "@/lib";
import { PaginatedMoviesResponse } from "@/models";

interface UseMoviesParams {
    page?: number;
    size?: number;
    winner?: boolean;
    year?: number;
}

export function useMovies({ page = 0, size = 10, winner, year }: UseMoviesParams) {
    const [data, setData] = useState<PaginatedMoviesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            setError(null);

            try {
                const moviesData = await fetchMovies({ page, size, winner, year });
                setData(moviesData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [page, size, winner, year]);

    return { data, loading, error };
}
