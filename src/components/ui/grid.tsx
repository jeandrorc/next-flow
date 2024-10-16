import React, { ReactNode } from 'react';

interface BoxProps {
    children: ReactNode;
    className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
    return <div className={`box ${className}`}>{children}</div>;
};

interface HBoxProps {
    children: ReactNode;
    gutter?: number;
}

export const HBox: React.FC<HBoxProps> = ({ children, gutter = 16 }) => {
    return (
        <div className="flex" style={{ gap: `${gutter}px` }}>
            {children}
        </div>
    );
};

interface VBoxProps {
    children: ReactNode;
    gutter?: number;
}

export const VBox: React.FC<VBoxProps> = ({ children, gutter = 16 }) => {
    return (
        <div className="flex flex-col" style={{ gap: `${gutter}px` }}>
            {children}
        </div>
    );
};

interface GridProps {
    children: ReactNode;
    gutter?: number;
    className?: string;
    cols?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
}

export const Grid: React.FC<GridProps> = ({ children, cols , gutter = 16, className }) => {
    const gridClasses = `
        grid
        ${cols?.xs ? `grid-cols-${cols.xs}` : ''} 
        ${cols?.sm ? `sm:grid-cols-${cols.sm}` : ''} 
        ${cols?.md ? `md:grid-cols-${cols.md}` : ''} 
        ${cols?.lg ? `lg:grid-cols-${cols.lg}` : ''} 
        ${cols?.xl ? `xl:grid-cols-${cols.xl}` : ''}
        ${className && className}
    `;

    return (
        <div className={gridClasses} style={{ gap: `${gutter}px` }}>
            {children}
        </div>
    );
};
