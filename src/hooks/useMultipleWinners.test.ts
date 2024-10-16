import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useMultipleWinners } from '@/hooks/useMultipleWinners';
import { fetchMultipleWinners } from '@/lib/fetchMultipleWinners';
import { vi } from 'vitest';
import { MultipleWinnersResponse } from '@/models';

const mockMultipleWinnersData: MultipleWinnersResponse = {
    years: [
        {
            year: 2020,
            winnerCount: 2,
        },
        {
            year: 2018,
            winnerCount: 3,
        },
    ],
};

vi.mock('@/lib/fetchMultipleWinners');

describe('useMultipleWinners', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch multiple winners data successfully', async () => {
        vi.mocked(fetchMultipleWinners).mockResolvedValueOnce(mockMultipleWinnersData);

        const { result, waitForNextUpdate } = renderHook(() => useMultipleWinners());

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockMultipleWinnersData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error while fetching multiple winners data', async () => {
        vi.mocked(fetchMultipleWinners).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() => useMultipleWinners());

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.error).toBe('Failed to fetch');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });
});
