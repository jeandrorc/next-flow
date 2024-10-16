import { describe, it, expect, vi } from 'vitest';
import { fetchWinIntervals } from '@/lib/fetchWinIntervals';
import { WinIntervalResponse } from '@/models';

const mockWinIntervalResponse: WinIntervalResponse = {
    min: [
        {
            producer: 'Producer A',
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
        },
    ],
    max: [
        {
            producer: 'Producer B',
            interval: 10,
            previousWin: 1990,
            followingWin: 2000,
        },
    ],
};

describe('fetchWinIntervals', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch win intervals for producers', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockWinIntervalResponse,
        } as Response);

        const response = await fetchWinIntervals();

        expect(response).toEqual(mockWinIntervalResponse);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?projection=max-min-win-interval-for-producers`
        );
    });

    it('should throw an error if the API response is not ok', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        } as Response);

        await expect(fetchWinIntervals()).rejects.toThrow(
            'Failed to fetch win intervals for producers'
        );
    });
});
