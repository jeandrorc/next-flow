import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFilters } from '@/hooks/useFilters';

describe('useFilters', () => {
    it('should initialize with undefined filters', () => {

        const { result } = renderHook(() => useFilters());


        expect(result.current.yearFilter).toBeUndefined();
        expect(result.current.winnerFilter).toBeUndefined();
    });

    it('should update the year filter correctly', () => {
        const { result } = renderHook(() => useFilters());


        act(() => {
            result.current.handleYearChange(2020);
        });


        expect(result.current.yearFilter).toBe(2020);
    });

    it('should update the winner filter correctly', () => {
        const { result } = renderHook(() => useFilters());

        act(() => {
            result.current.handleWinnerChange(true);
        });

        expect(result.current.winnerFilter).toBe(true);


        act(() => {
            result.current.handleWinnerChange(false);
        });
        expect(result.current.winnerFilter).toBe(false);
    });

    it('should reset the filters to undefined', () => {
        const { result } = renderHook(() => useFilters());

        act(() => {
            result.current.handleYearChange(2020);
            result.current.handleWinnerChange(true);
        });


        expect(result.current.yearFilter).toBe(2020);
        expect(result.current.winnerFilter).toBe(true);


        act(() => {
            result.current.handleYearChange(undefined);
            result.current.handleWinnerChange(undefined);
        });

        expect(result.current.yearFilter).toBeUndefined();
        expect(result.current.winnerFilter).toBeUndefined();
    });
});
