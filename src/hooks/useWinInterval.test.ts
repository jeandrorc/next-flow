import { renderHook } from '@testing-library/react-hooks';
import { useWinIntervals } from '@/hooks/useWinIntervals';
import { fetchWinIntervals } from '@/lib/fetchWinIntervals';
import { vi } from 'vitest';
import { WinIntervalResponse } from '@/models';

const mockWinIntervalsData: WinIntervalResponse = {
    min: [
        { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
    ],
    max: [
        { producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 },
    ],
};

vi.mock('@/lib/fetchWinIntervals');

describe('useWinIntervals', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch win intervals successfully', async () => {
        vi.mocked(fetchWinIntervals).mockResolvedValueOnce(mockWinIntervalsData);

        const { result, waitForNextUpdate } = renderHook(() => useWinIntervals());

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockWinIntervalsData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error while fetching win intervals', async () => {
        vi.mocked(fetchWinIntervals).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() => useWinIntervals());

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.error).toBe('Failed to fetch');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });
});
