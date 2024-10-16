"use client";
import React from 'react';
import {Select as SelectBase, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui";

interface Option {
    value: string | number;
    label: string;
}

interface SimpleSelectProps {
    options: Option[];
    value?: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
}

export const Select: React.FC<SimpleSelectProps> = ({ options, onChange, value, placeholder = 'Select an option' }) => {

    const handleChange = (selectedValue: string | number) => {
        onChange(selectedValue);
    };

    return (
        <SelectBase
            value={value}
            onValueChange={handleChange}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{placeholder}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </SelectBase>
    );
};
