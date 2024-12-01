
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const publicPaths = ['/login', '/signup', '/verifyemail'];

  // Retrieve token from cookies
  const token = request.cookies.get('token')?.value;

  // If user is authenticated and tries to access public paths, redirect to home
  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is unauthenticated and tries to access private paths, redirect to login
  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to continue if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/verifyemail', '/profile/:path*'], // Supports dynamic routes
};
