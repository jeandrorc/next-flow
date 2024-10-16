"use client";

import React from 'react';
import {useMultipleWinners} from "@/hooks";
import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui";

export function MultipleWinnersComponent() {
    const { data, loading, error } = useMultipleWinners();

    return (
        <Card>
            <CardHeader>
                <h2>Multiple Winners</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Win Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.years?.map((item) => (
                            <TableRow key={item.year}>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.winnerCount}</TableCell>
                            </TableRow>
                        ))}

                        { data?.years?.length && !error && !loading === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div>
                                        No data found
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