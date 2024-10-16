import {Movie} from "@/models";

export async function fetchMovieByYear(year: number): Promise<Movie> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}?winner=true&year=${year}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch movie by year');
    }

    return await response.json() as Movie;
}
