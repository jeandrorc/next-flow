import { describe, it, expect, vi } from 'vitest';
import { fetchMovies } from '@/lib/fetchMovies';
import { PaginatedMoviesResponse } from '@/models';

// Mock de exemplo para a resposta paginada de filmes
const mockPaginatedMoviesResponse: PaginatedMoviesResponse = {
    content: [
        {
            id: 1,
            title: 'Movie 1',
            year: 2020,
            studios: ['Studio A'],
            producers: ['Producer A'],
            winner: true,
        },
    ],
    pageable: {
        sort: { sorted: false, unsorted: true },
        pageSize: 10,
        pageNumber: 0,
        offset: 0,
        paged: true,
        unpaged: false,
    },
    totalElements: 1,
    last: true,
    totalPages: 1,
    first: true,
    sort: { sorted: false, unsorted: true },
    number: 0,
    numberOfElements: 1,
    size: 10,
};

describe('fetchMovies', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // Reseta mocks antes de cada teste
    });

    it('should fetch paginated movies with correct query string', async () => {
        // Simular a função fetch para retornar os dados corretamente
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockPaginatedMoviesResponse,
        } as Response);

        const page = 1;
        const size = 10;
        const year = 2020;
        const winner = true;

        const response = await fetchMovies({ page, size, winner, year });

        // Verifica se os dados retornados são iguais ao mock
        expect(response).toEqual(mockPaginatedMoviesResponse);

        // Verifica se a função fetch foi chamada com a URL correta
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?page=1&size=10&winner=true&year=2020`
        );
    });

    it('should throw an error if the API response is not ok', async () => {
        // Simular a função fetch para retornar um erro
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        } as Response);

        // Verifica se a função lança um erro quando a API falha
        await expect(fetchMovies({ page: 1, size: 10, year: 2020, winner: true })).rejects.toThrow(
            'Failed to fetch movies'
        );
    });

    it('should handle undefined and null values in query parameters', async () => {
        // Simula o fetch bem-sucedido
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockPaginatedMoviesResponse,
        } as Response);

        const response = await fetchMovies({ page: 0, size: 10, winner: null, year: undefined });

        expect(response).toEqual(mockPaginatedMoviesResponse);

        // Verifica se os parâmetros undefined e null são excluídos da query string
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}?page=0&size=10`
        );
    });
});
