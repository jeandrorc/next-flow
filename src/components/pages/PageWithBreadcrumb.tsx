import React from "react";
import Link from "next/link";

type Page = {
  name: string;
  url?: string; // Tornar URL opcional para o último item
};

interface PageWithBreadcrumbProps {
  children: React.ReactNode;
  pages?: Page[];
}

export function PageWithBreadcrumb({
                                     children,
                                     pages = [],
                                   }: PageWithBreadcrumbProps) {

  return (
    <div className="min-h-screen">
      <nav className=" py-3">
        <div className="container mx-auto px-6">
          <ul className="flex items-center text-sm text-gray-500">
            <li>
              <Link href="/"
                    className="font-medium text-blue-500 hover:underline">
                Home
              </Link>
              {pages?.length > 0 && <span className="mx-2">{'>'}</span>}
            </li>
            {pages?.map((page, index) => (
              <Breadcrumb
                key={index}
                name={page.name}
                url={page.url}
                isLast={index === pages?.length - 1}
              />
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

interface BreadcrumbProps extends Page {
  isLast: boolean;
}

function Breadcrumb({name, url, isLast}: BreadcrumbProps) {
  return (
    <li className="flex items-center">
      {!isLast ? (
        <>
          <Link href={url!} className="text-blue-600 hover:underline">
            {name}
          </Link>
          <span className="mx-2">{'>'}</span>
        </>
      ) : (
        <span className="font-semibold text-gray-700">{name}</span>
      )}
    </li>
  );
}
