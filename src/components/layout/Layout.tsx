import React from 'react';
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({children}: LayoutProps) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-1 flex-col">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
