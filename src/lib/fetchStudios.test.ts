import { describe, it, expect, vi } from 'vitest';
import { fetchStudios } from '@/lib/fetchStudios';
import { StudiosWithWinCountResponse } from '@/models';

const mockStudiosWithWinCountResponse: StudiosWithWinCountResponse = {
    studios: [
        {
            name: 'Studio A',
            winCount: 10,
        },
        {
            name: 'Studio B',
            winCount: 5,
        },
    ],
};

describe('fetchStudios', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // Reseta mocks antes de cada teste
    });

    it('should fetch studios with win count', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockStudiosWithWinCountResponse,
        } as Response);

        const response = await fetchStudios();

        expect(response).toEqual(mockStudiosWithWinCountResponse);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?projection=studios-with-win-count`
        );
    });

    it('should throw an error if the API response is not ok', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        } as Response);

        await expect(fetchStudios()).rejects.toThrow(
            'Failed to fetch studios with win count'
        );
    });
});
