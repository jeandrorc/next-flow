import {PaginatedMoviesResponse} from "@/models";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


function buildQueryString(params: { [key: string]: string | number | boolean | undefined | null }): string {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryString.append(key, value.toString());
        }
    });

    return queryString.toString();
}


export async function fetchMovies({
                               page = 0,
                               size = 10,
                               winner,
                               year,
                           }: {
    page?: number;
    size?: number;
    winner?: boolean;
    year?: number;
}): Promise<PaginatedMoviesResponse> {
    const params = {page, size, winner, year};

    const queryString = buildQueryString(params);
    const url = `${baseUrl}?${queryString}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    return await response.json() as PaginatedMoviesResponse;
}
