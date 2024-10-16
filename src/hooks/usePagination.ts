import { useState } from 'react';

export function usePagination() {
    const [page, setPage] = useState(0);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0) {
            setPage(newPage);
        }
    };

    return {
        page,
        handlePageChange
    };
}