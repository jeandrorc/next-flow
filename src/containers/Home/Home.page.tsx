import React from 'react'
import {
    MoviesByYearComponent,
    MultipleWinnersComponent,
    StudiosWithWinCountComponent,
    WinByIntervals
} from "@/containers/Home/components";
import {PageWithBreadcrumb} from "@/components/pages";
import {Grid} from "@/components/ui";

export function HomePage() {
    return (
        <PageWithBreadcrumb>
            <Grid cols={{
                sm: 1,
                md: 2,
            }} gutter={20}>
                <MultipleWinnersComponent/>
                <StudiosWithWinCountComponent/>
                <WinByIntervals/>
                <MoviesByYearComponent/>
            </Grid>
        </PageWithBreadcrumb>
    )
}