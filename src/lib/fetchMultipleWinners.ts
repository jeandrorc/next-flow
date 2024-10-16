import {MultipleWinnersResponse} from "@/models";

export async function fetchMultipleWinners(): Promise<MultipleWinnersResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}?projection=years-with-multiple-winners`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch years with multiple winners');
    }

    return await response.json() as MultipleWinnersResponse;
}
