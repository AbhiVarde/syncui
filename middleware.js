import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host");

  if (
    (hostname === "www.syncui.design" || hostname === "syncui.design") &&
    url.pathname.startsWith("/docs")
  ) {
    const newPath =
      url.pathname === "/docs" ? "/" : url.pathname.replace("/docs", "");
    return NextResponse.redirect(`https://docs.syncui.design${newPath}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/docs/:path*",
};
