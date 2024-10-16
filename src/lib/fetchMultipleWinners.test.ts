import { describe, it, expect, vi } from 'vitest';
import { fetchMultipleWinners } from '@/lib/fetchMultipleWinners';
import { MultipleWinnersResponse } from '@/models';

const mockMultipleWinnersResponse: MultipleWinnersResponse = {
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

describe('fetchMultipleWinners', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch years with multiple winners', async () => {

        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockMultipleWinnersResponse,
        } as Response);

        const response = await fetchMultipleWinners();


        expect(response).toEqual(mockMultipleWinnersResponse);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?projection=years-with-multiple-winners`
        );
    });

    it('should throw an error if the API response is not ok', async () => {

        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        } as Response);


        await expect(fetchMultipleWinners()).rejects.toThrow(
            'Failed to fetch years with multiple winners'
        );
    });
});
