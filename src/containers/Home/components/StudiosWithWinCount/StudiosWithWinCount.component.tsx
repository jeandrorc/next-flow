"use client";

import React from 'react';
import {useStudiosWithWinCount} from "@/hooks";
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

export function StudiosWithWinCountComponent() {
    const { data, loading, error } = useStudiosWithWinCount(3);

    return (
        <Card>
            <CardHeader>
                <h2>Top 3 studios with winners</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Win Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.studios?.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.winCount}</TableCell>
                            </TableRow>
                        ))}
                        { data?.studios.length === 0 && (
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