import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

/** Pick the visitor's language from Accept-Language; English when in doubt. */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  let best = defaultLocale;
  let highest = 0;
  for (const part of header.split(",")) {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const tag = range.trim().split("-")[0];
    const weight = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
    const quality = weight === undefined ? 1 : Number(weight.slice(2));
    if (isLocale(tag) && quality > highest && quality <= 1) {
      best = tag;
      highest = quality;
    }
  }
  return best;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.append("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Pages only: skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
