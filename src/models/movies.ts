export interface Movie {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}


export interface PaginatedMoviesResponse {
    content: Movie[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPages: number;
    first: boolean;
    sort: Sort;
    number: number;
    numberOfElements: number;
    size: number;
}
