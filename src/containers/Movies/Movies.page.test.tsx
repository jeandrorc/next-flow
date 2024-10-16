import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MoviesPage } from '@/containers/Movies/Movies.page';
import { useMovies } from '@/hooks/useMovies';
import { useFilters } from '@/hooks/useFilters';
import { usePagination } from '@/hooks/usePagination';

vi.mock('@/hooks/useMovies');
vi.mock('@/hooks/useFilters');
vi.mock('@/hooks/usePagination');
vi.mock('@/containers/Movies/components/MoviesTable', () => ({
    MoviesTable: () => <div>MoviesTable Component</div>,
}));
vi.mock('@/components/table', () => ({
    Pagination: ({ currentPage, totalPages }) => (
        <div>
            Pagination Component - Current Page: {currentPage}, Total Pages: {totalPages}
</div>
),
}));

describe('MoviesPage', () => {
    it('should render movies page with table and pagination', () => {
        vi.mocked(useFilters).mockReturnValue({
            yearFilter: 2020,
            winnerFilter: true,
            handleYearChange: vi.fn(),
            handleWinnerChange: vi.fn(),
        });

        vi.mocked(usePagination).mockReturnValue({
            page: 1,
            handlePageChange: vi.fn(),
        });

        vi.mocked(useMovies).mockReturnValue({
            data: { totalPages: 5 },
            loading: false,
            error: null,
        });

        render(<MoviesPage />);

        expect(screen.getByText('MoviesTable Component')).toBeInTheDocument();
        expect(screen.getByText('Pagination Component - Current Page: 1, Total Pages: 5')).toBeInTheDocument();
    });

    it('should display loading state when loading', () => {
        vi.mocked(useFilters).mockReturnValue({
            yearFilter: 2020,
            winnerFilter: true,
            handleYearChange: vi.fn(),
            handleWinnerChange: vi.fn(),
        });

        vi.mocked(usePagination).mockReturnValue({
            page: 1,
            handlePageChange: vi.fn(),
        });

        vi.mocked(useMovies).mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        render(<MoviesPage />);

        expect(screen.getByText('MoviesTable Component')).toBeInTheDocument();
    });

    it('should handle error state', () => {
        vi.mocked(useFilters).mockReturnValue({
            yearFilter: 2020,
            winnerFilter: true,
            handleYearChange: vi.fn(),
            handleWinnerChange: vi.fn(),
        });

        vi.mocked(usePagination).mockReturnValue({
            page: 1,
            handlePageChange: vi.fn(),
        });

        vi.mocked(useMovies).mockReturnValue({
            data: null,
            loading: false,
            error: 'Failed to fetch',
        });

        render(<MoviesPage />);

        expect(screen.getByText('MoviesTable Component')).toBeInTheDocument();
    });
});
