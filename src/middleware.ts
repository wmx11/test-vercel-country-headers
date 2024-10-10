import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
type Countries = "FR" | "LT";

export function middleware(request: NextRequest) {
  const region = request.headers.get("x-vercel-ip-country-region");

  console.log("Request coming from region -> ", region);

  const country = (request.geo && request.geo.country) as Countries;

  const mappedRoutes = {
    FR: "/about/france",
    LT: "/about/lithuania",
    default: "/about",
  };

  console.log("Request coming from -> ", country);

  console.log(
    "Should load the following route -> ",
    mappedRoutes[country] || mappedRoutes.default
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
