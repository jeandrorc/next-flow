import React from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";

export function Footer() {
    return (
        <footer className={cn("text-gray-500 py-6")}>
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; 2024 <span className="font-semibold">Jeandro Couto</span>. All rights reserved.
                </p>
                <div className="mt-4 space-x-4">
                    <Link href="https://github.com/jeandrorc" target="_blank" rel="noopener noreferrer" variant="link" className="hover:text-gray-400">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/jeandro" target="_blank" rel="noopener noreferrer" variant="link" className="hover:text-gray-400">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    );
}
