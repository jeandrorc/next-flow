import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useMovies } from '@/hooks/useMovies';
import { fetchMovies } from '@/lib/fetchMovies';
import { vi } from 'vitest';
import { PaginatedMoviesResponse } from '@/models';

const mockMoviesData: PaginatedMoviesResponse = {
    content: [
        {
            id: 1,
            title: 'Example Movie',
            year: 2020,
            studios: ['Studio A'],
            producers: ['Producer A'],
            winner: true,
        },
    ],
    pageable: {
        sort: { sorted: false, unsorted: true },
        pageSize: 10,
        pageNumber: 0,
        offset: 0,
        paged: true,
        unpaged: false,
    },
    totalElements: 1,
    last: true,
    totalPages: 1,
    first: true,
    sort: { sorted: false, unsorted: true },
    number: 0,
    numberOfElements: 1,
    size: 10,
};

vi.mock('@/lib/fetchMovies');

describe('useMovies', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch movies data successfully', async () => {
        vi.mocked(fetchMovies).mockResolvedValueOnce(mockMoviesData);

        const { result, waitForNextUpdate } = renderHook(() =>
            useMovies({ page: 1, size: 10, year: 2020, winner: true })
        );

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockMoviesData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error while fetching movies data', async () => {
        vi.mocked(fetchMovies).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() =>
            useMovies({ page: 1, size: 10, year: 2020, winner: true })
        );

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.error).toBe('Failed to fetch');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });
});
