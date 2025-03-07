import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  // Handle logout: Delete the session cookie and redirect to /login
  if (pathname === '/api/auth/logout') {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('session');
    return response;
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];

  // If the user is already logged in and tries to access public routes, redirect them
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If the user is not authenticated and tries to access a protected route, redirect them to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If a token exists, verify it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next(); // ✅ Valid token, proceed
    } catch (error) {
      console.error('JWT verification failed:', error);
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('session'); // Clear invalid session
      return response;
    }
  }

  return NextResponse.next(); 
}