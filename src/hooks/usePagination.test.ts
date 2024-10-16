import { renderHook, act } from '@testing-library/react-hooks';
import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
    it('should initialize with page 0', () => {
        const { result } = renderHook(() => usePagination());

        expect(result.current.page).toBe(0);
    });

    it('should update page correctly', () => {
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.handlePageChange(2);
        });

        expect(result.current.page).toBe(2);
    });

    it('should not set page to a negative value', () => {
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.handlePageChange(-1);
        });

        expect(result.current.page).toBe(0);
    });
});
