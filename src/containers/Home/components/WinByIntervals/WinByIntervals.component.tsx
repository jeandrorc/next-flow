"use client";

import React from 'react';
import {useWinIntervals} from "@/hooks";
import {
    Card,
    CardContent,
    CardHeader, Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui";

export function WinByIntervals() {
    const { data, loading, error } = useWinIntervals();


    return (
        <Card>
            <CardHeader>
                <h2>Top 3 studios with winners</h2>
            </CardHeader>
            <CardContent>
                <Label>Maximum</Label>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producer</TableHead>
                            <TableHead>Interval</TableHead>
                            <TableHead>Previous Year</TableHead>
                            <TableHead>Following Year</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.max.map((item) => (
                            <TableRow key={item.producer}>
                                <TableCell width={200}>{item.producer}</TableCell>
                                <TableCell>{item.interval}</TableCell>
                                <TableCell>{item.previousWin}</TableCell>
                                <TableCell>{item.followingWin}</TableCell>
                            </TableRow>
                        ))}
                        { data?.max.length === 0 && (
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
                <label>Minimum</label>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producer</TableHead>
                            <TableHead>Interval</TableHead>
                            <TableHead>Previous Year</TableHead>
                            <TableHead>Following Year</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.min.map((item) => (
                            <TableRow key={item.producer}>
                                <TableCell width={200}>{item.producer}</TableCell>
                                <TableCell>{item.interval}</TableCell>
                                <TableCell>{item.previousWin}</TableCell>
                                <TableCell>{item.followingWin}</TableCell>
                            </TableRow>
                        ))}
                        { data?.min.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div>
                                        No data found
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}