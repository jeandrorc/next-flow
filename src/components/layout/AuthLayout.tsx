import React from 'react';
import {Footer} from "@/components/layout/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({children}: LayoutProps) {
    return (
        <html lang="pt-br">
            <body className="flex flex-col min-h-screen bg-primary text-primary-foreground">
                <main className="flex-1 flex-col flex items-center justify-center">
                    {children}
                </main>
                <Footer/>
            </body>
        </html>
    );
}