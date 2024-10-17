import React from 'react';
import {cn} from '@/lib/utils'; // Função utilitária para combinar classes (Chadcn UI)

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Permite sobrescrever estilos se necessário
}

export function Container({children, className}: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
