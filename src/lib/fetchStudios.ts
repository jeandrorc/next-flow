import {StudiosWithWinCountResponse} from "@/models";

export async function fetchStudios(): Promise<StudiosWithWinCountResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}?projection=studios-with-win-count`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch studios with win count');
    }

    return await response.json() as StudiosWithWinCountResponse;
}
