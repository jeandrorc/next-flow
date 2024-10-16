"use client";

import React from 'react';
import {useMovieByYear} from "@/hooks";
import {
    Card,
    CardContent,
    CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui";
import {SelectYear} from "@/components/form";

const currentYear = new Date().getFullYear();

export function MoviesByYearComponent() {
    const [year, setYear] = React.useState<string | null>(currentYear);
    const { data, loading, error } = useMovieByYear(year);

    return (
        <Card>
            <CardHeader>
                <h2>List movie winners by year</h2>
            </CardHeader>
            <CardContent>
                <SelectYear minYear={1960} maxYear={currentYear} onChange={setYear} value={year}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Title</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item.title}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.title}</TableCell>
                            </TableRow>
                        ))}
                        { data?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div>
                                        No data found for this year
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        { loading && (
                            <TableRow>
                                <TableCell colSpan={3}>Loading...</TableCell>
                            </TableRow>
                        )}
                        { error && (
                            <TableRow>
                                <TableCell colSpan={3}>{error}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}