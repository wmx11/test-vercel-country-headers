import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
type Countries = "FR" | "LT" | null;

export function middleware(request: NextRequest) {
  const country = (request.geo && request.geo.country) as Countries;

  const mappedRoutes = {
    FR: "/about/france",
    LT: "/about/lithuania",
    default: "/about",
  };

  console.log("Request coming from -> ", country);

  console.log(
    "Should load the following route -> ",
    mappedRoutes[country || "default"]
  );

  if (
    country &&
    mappedRoutes[country] &&
    request.nextUrl.pathname !== mappedRoutes[country]
  ) {
    return NextResponse.redirect(
      new URL(mappedRoutes[country] || mappedRoutes.default, request.url)
    );
  }
}
