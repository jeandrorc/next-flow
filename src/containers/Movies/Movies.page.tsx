"use client";
import React from 'react';
import { PageWithBreadcrumb } from "@/components/pages/PageWithBreadcrumb";
import { useMovies } from "@/hooks/useMovies";
import { useFilters } from "@/hooks/useFilters";
import { usePagination } from "@/hooks/usePagination";
import { MoviesTable } from "@/containers/Movies/components/MoviesTable";
import {Pagination} from "@/components/table";

export function MoviesPage() {
    const filters = useFilters();
    const { page, handlePageChange } = usePagination();

    const { data, loading, error } = useMovies({
        page: page,
        size: 20,
        winner: filters.winnerFilter,
        year: filters.yearFilter,
    });

    return (
        <PageWithBreadcrumb pages={[{ name: "Movies" }]}>
            <MoviesTable data={data} loading={loading} error={error} filters={filters}/>
            <Pagination
                currentPage={page}
                totalPages={data?.totalPages}
                onPageChange={handlePageChange}
            />
        </PageWithBreadcrumb>
    );
}
