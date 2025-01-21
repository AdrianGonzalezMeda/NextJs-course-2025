import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log(request);
    return NextResponse.next();
}

// Filter the kind of request triggers middleware
// DOC: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
    matcher: '/news'
};