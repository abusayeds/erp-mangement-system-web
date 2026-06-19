import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  DEFAULT_LOGIN_REDIRECT,
} from "@/lib/auth/constants";

const guestOnlyRoutes = ["/login", "/register"];
const protectedPrefixes = [
  "/dashboard",
  "/confirm-password",
  "/super-admin",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isGuestRoute = guestOnlyRoutes.includes(pathname);
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/super-admin/:path*",
    "/confirm-password",
  ],
};
