import React from 'react'
import Link from "next/link";

type Page = {
    name: string;
    url: string;
}

interface PageWithBreadcrumbProps {
    children: React.ReactNode;
    pages?: Page[];
}


export function PageWithBreadcrumb({children, pages}: PageWithBreadcrumbProps) {
    return (
        <div>
            <nav className="border-b">
                <div className="container mx-auto px-6 py-3">
                    <ul className="flex">
                        <li>
                            <a href="/" className="font-bold text-gray-500">Home</a>
                            { pages?.length > 0 && <span className="mx-2">{'>'}</span>}
                        </li>
                        {pages && pages?.map((page, index) => (<Breadcrumb name={page.name} url={page.url} key={index}/>))}
                    </ul>
                </div>
            </nav>
            <div className="container mx-auto px-6 py-6">
                {children}
            </div>
        </div>
    );
}

function Breadcrumb({name, url}: Page) {
    const isLast = !url;
    return (
        <li>
            {!isLast && <Link href={url} className="text-blue-600">{name}</Link>}
            {isLast && <span className="font-black">{name}</span>}
            {!isLast && <span className="mx-2">{'>'}</span>}
        </li>
    );
}