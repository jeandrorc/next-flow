import {WinIntervalResponse} from "@/models";

export async function fetchWinIntervals(): Promise<WinIntervalResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}?projection=max-min-win-interval-for-producers`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch win intervals for producers');
    }

    return  await response.json() as WinIntervalResponse;
}
