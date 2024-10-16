import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui";
import {PaginatedMoviesResponse} from "@/models";
import {FilterState} from "@/hooks/useFilters";
import {SelectYear} from "@/components/form";
import {Select} from "@/components/form/Select";
import {YearFilter} from "@/containers/Movies/components/YearFilter";
import {WinnersFilter} from "@/containers/Movies/components/WinnersFilter";

interface MoviesTableProps {
    data: PaginatedMoviesResponse;
    loading: boolean;
    error: string | null;
    filters: FilterState;
}


export const MoviesTable: React.FC<MoviesTableProps> = ({data, loading, error, filters}) => {

    return (
        <Table>
            <TableHeader>
                <TableRow className="pb-2">
                    <TableHead width={60}>ID</TableHead>
                    <TableHead width={200}>
                        <div className="flex flex-col justify-center items-center">
                            <div>Year</div>
                            <YearFilter filters={filters}/>
                        </div>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead width={100}>
                        <div className="flex flex-col justify-center items-center">
                            <div>Winner?</div>
                            <WinnersFilter filters={filters}/>
                        </div>

                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
                {error && <TableRow><TableCell colSpan={4}>{error}</TableCell></TableRow>}
                {!error && data?.content?.map((movie) => (
                    <TableRow key={movie.id}>
                        <TableCell>{movie.id}</TableCell>
                        <TableCell>{movie.year}</TableCell>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>{movie.winner ? "Yes" : "No"}</TableCell>
                    </TableRow>
                ))}
                {!loading && !error && data?.content?.length === 0 &&
                    <TableRow><TableCell colSpan={4}>No data</TableCell></TableRow>}
            </TableBody>
        </Table>
    );
};
