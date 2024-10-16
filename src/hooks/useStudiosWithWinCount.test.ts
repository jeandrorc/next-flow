import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useStudiosWithWinCount } from '@/hooks/useStudiosWithWinCount';
import { fetchStudios } from '@/lib/fetchStudios';
import { vi } from 'vitest';
import { StudiosWithWinCountResponse } from '@/models';

const mockStudiosData: StudiosWithWinCountResponse = {
    studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 7 },
        { name: 'Studio C', winCount: 5 },
        { name: 'Studio D', winCount: 3 },
    ],
};

vi.mock('@/lib/fetchStudios');

describe('useStudiosWithWinCount', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch top studios by win count successfully', async () => {
        vi.mocked(fetchStudios).mockResolvedValueOnce(mockStudiosData);

        const { result, waitForNextUpdate } = renderHook(() => useStudiosWithWinCount(3));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual({
            studios: [
                { name: 'Studio A', winCount: 10 },
                { name: 'Studio B', winCount: 7 },
                { name: 'Studio C', winCount: 5 },
            ],
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error while fetching studios data', async () => {
        vi.mocked(fetchStudios).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() => useStudiosWithWinCount(3));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.error).toBe('Failed to fetch');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });
});
