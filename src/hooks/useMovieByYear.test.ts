import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useMovieByYear } from '@/hooks/useMovieByYear';
import { fetchMovieByYear } from '@/lib/fetchMovieByYear';
import { vi } from 'vitest';

const mockMovie = [
    {
        id: 1,
        title: 'Example Movie',
        year: 2020,
        studios: ['Studio A'],
        producers: ['Producer A'],
        winner: true,
    },
];

vi.mock('@/lib/fetchMovieByYear');

describe('useMovieByYear', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch movie data successfully', async () => {
        vi.mocked(fetchMovieByYear).mockResolvedValueOnce(mockMovie);

        const { result, waitForNextUpdate } = renderHook(() => useMovieByYear(2020));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockMovie);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error while fetching movie data', async () => {
        vi.mocked(fetchMovieByYear).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() => useMovieByYear(2020));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.error).toBe('Failed to fetch');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });
});
