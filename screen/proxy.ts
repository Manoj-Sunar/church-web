// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // ✅ Require BOTH tokens — otherwise backend will reject any API call
  const isLoggedIn = !!accessToken && !!refreshToken;

  const isLoginRoute = pathname === "/admin-login";
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

  console.log("[proxy]", pathname, {
    access: !!accessToken,
    refresh: !!refreshToken,
    isLoggedIn,
  });

  if (!isLoggedIn && isAdminRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && isLoginRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};