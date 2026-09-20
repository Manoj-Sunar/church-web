import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const isLoggedIn = !!accessToken || !!refreshToken;

    const isLoginRoute = pathname === "/admin-login";
    const isAdminRoute =
        pathname.startsWith("/admin") && !isLoginRoute;

    // 1. Not logged in → block admin routes, send to login
    if (!isLoggedIn && isAdminRoute) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin-login";
        return NextResponse.redirect(url);
    }

    // 2. Logged in → don't show the login page, send to dashboard
    if (isLoggedIn && isLoginRoute) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    // 3. Allow
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};