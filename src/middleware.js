import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/signup"];
const DEFAULT_REDIRECT = "/dashboard";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Skip public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = req.cookies.get("session")?.value;
  
  if (!session) {
    return redirectToLogin(req);
  }

  try {
    await jwtVerify(
      session,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return redirectToLogin(req);
  }
}

function redirectToLogin(req) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
