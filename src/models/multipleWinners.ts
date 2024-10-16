export interface YearWithWinners {
    year: number;
    winnerCount: number;
}

export interface MultipleWinnersResponse {
    years: YearWithWinners[];
}