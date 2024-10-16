import React from 'react';
import { cn } from '@/lib/utils'; // Função utilitária para combinar classes (Chadcn UI)

interface ContainerProps {
    children: React.ReactNode;
    className?: string; // Permite sobrescrever estilos se necessário
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div
            className={cn(
                "max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 w-full", // Definimos a largura máxima e padding horizontal
                className // Sobrescreve classes se o usuário passar algo adicional
            )}
        >
            {children}
        </div>
    );
}
