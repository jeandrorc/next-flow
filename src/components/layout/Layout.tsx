import React from 'react';
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import {SideMenu} from "@/components/layout/SideMenu";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({children}: LayoutProps) {
    return (
        <html lang="pt-br">
        <body className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex flex-1 flex-row">
            <SideMenu/>
            <div className="flex flex-1 flex-col">
                <main className="flex-1 flex-col">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
        </body>
        </html>
    );
}