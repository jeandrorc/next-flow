import React from 'react';
import {SelectYear} from "@/components/form";
import {FilterState} from "@/hooks/useFilters";
import {Button} from "@/components/ui";

interface YearFilterProps {
    filters: FilterState
}

const currentYear = new Date().getFullYear();

export function YearFilter({filters}: YearFilterProps) {
    return (
        <div>
            {!filters?.yearFilter && <SelectYear placeholder="Filter by year"
                                                 minYear={1960}
                                                 maxYear={currentYear}
                                                 onChange={filters?.handleYearChange}
                                                 value={filters?.yearFilter}/>}

            { filters?.yearFilter && <div className="flex items-center p-2">
                <Button variant="outline" size="xxs" onClick={() => filters?.handleYearChange(undefined)} className="ml-2 text-red-500">{filters.yearFilter} x</Button>
            </div>}
        </div>
    );
}