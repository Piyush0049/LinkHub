import { NextResponse } from 'next/server';
export function middleware(request) {
    if (!request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|login|signup|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',
    ],
};
