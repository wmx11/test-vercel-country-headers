import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
type Countries = "fr" | "lt" | null;

export function middleware(request: NextRequest) {
  const countryHeader = request.headers.get("x-vercel-ip-country") as Countries;

  const mappedRoutes = {
    fr: "/about/france",
    lt: "/about/lithuania",
    default: "/about",
  };

  if (
    countryHeader &&
    mappedRoutes[countryHeader] &&
    request.url.includes("about")
  ) {
    return NextResponse.redirect(
      new URL(mappedRoutes[countryHeader] || mappedRoutes.default, request.url)
    );
  }
}
