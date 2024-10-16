import { useState } from 'react';

export interface FilterState {
    yearFilter: number | undefined;
    winnerFilter: boolean | undefined;
    handleYearChange: (year: number | undefined) => void;
    handleWinnerChange: (winner: boolean | undefined) => void;
}

export function useFilters(): FilterState {
    const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);
    const [winnerFilter, setWinnerFilter] = useState<boolean | undefined>(undefined);

    const handleYearChange = (year: number | undefined) => {
        setYearFilter(year);
    };

    const handleWinnerChange = (winner: boolean | undefined) => {
        setWinnerFilter(winner);
    };

    return {
        yearFilter,
        winnerFilter,
        handleYearChange,
        handleWinnerChange,
    };
}