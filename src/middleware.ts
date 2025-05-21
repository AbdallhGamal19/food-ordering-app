import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n, LanguagesType } from "./i18n.config";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeader: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeader[key] = value));
  const locales: LanguagesType[] = i18n.locales;
  const Languages = new Negotiator({ headers: negotiatorHeader }).languages();
  let locale = "";
  try {
    locale = matchLocale(Languages, locales, i18n.defultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  } catch (error: any) {
    console.log(error);
    locale = i18n.defultLocale;
  }
  return locale;
}

export function middleware(request: NextRequest) {
  const requestHeader = new Headers(request.headers);
  requestHeader.set("x-url", request.url);
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
  return NextResponse.next({ request: { headers: requestHeader } });
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
