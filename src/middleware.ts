import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const currentPath = request.nextUrl.pathname;

    const response = NextResponse.next();
    response.headers.set('x-pathname', currentPath);

    return response;
}


export const config = {
    matcher: '/:path*',
};
