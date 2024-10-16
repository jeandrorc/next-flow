import React from 'react';
import {FilterState} from "@/hooks/useFilters";
import {Button} from "@/components/ui";
import {Select} from "@/components/form/Select";

interface YearFilterProps {
    filters: FilterState
}


export function WinnersFilter({filters}: YearFilterProps) {
    return (
        <div>
            {!filters?.winnerFilter && <Select
                options={[
                    {value: "true", label: "Yes"},
                    {value: "false", label: "No"},
                ]}
                value={filters?.winnerFilter}
                onChange={filters?.handleWinnerChange}
                placeholder="Filter by winner"
            />}

            {filters?.winnerFilter && <div className="flex items-center p-2">
                <Button variant="outline" size="xxs" onClick={() => filters?.handleWinnerChange(undefined)}
                        className="ml-2 text-red-500">{filters.winnerFilter === false ?  'No' : 'Yes'} x</Button>
            </div>}
        </div>
    );
}