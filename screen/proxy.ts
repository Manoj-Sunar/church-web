import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const isLoggedIn = !!accessToken || !!refreshToken;

    const isAdminRoute =
        pathname.startsWith("/admin") && pathname !== "/admin-login";

    const isLoginRoute = pathname === "/admin-login";

    // =========================
    // 1. NOT LOGGED IN → BLOCK ADMIN ROUTES
    // =========================
    if (!isLoggedIn && isAdminRoute) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin-login";
        return NextResponse.redirect(url);
    }

    // =========================
    // 2. LOGGED IN → BLOCK LOGIN PAGE
    // =========================
    if (isLoggedIn && isLoginRoute) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    // =========================
    // 3. ALLOW REQUEST
    // =========================
    return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
    matcher: ["/admin/:path*", "/admin-login"],
};