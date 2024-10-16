import { describe, it, expect, vi } from 'vitest';
import { fetchMovieByYear } from '@/lib/fetchMovieByYear';
import { Movie } from '@/models';


const mockMovie: Movie = {
    id: 1,
    title: 'Example Movie',
    year: 2020,
    studios: ['Studio A'],
    producers: ['Producer A'],
    winner: true,
};

describe('fetchMovieByYear', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch the movie for a given year', async () => {

        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockMovie,
        } as Response);

        const movie = await fetchMovieByYear(2020);

        expect(movie).toEqual(mockMovie);
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?winner=true&year=2020`
        );
    });

    it('should throw an error when the API response is not ok', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        } as Response);

        await expect(fetchMovieByYear(2020)).rejects.toThrow('Failed to fetch movie by year');
    });
});
