import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { decrypt, deleteSession } from './lib/session';

export async function proxy(request: NextRequest) {
  const singinPage = '/singin';
  const nextRespose = NextResponse.next({ request });

  const cookiesHandler = await cookies();
  const session = cookiesHandler.get('session')?.value;
  if (request.nextUrl.pathname === singinPage) {
    deleteSession();
    return nextRespose;
  }

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = singinPage;
    return NextResponse.redirect(url);
  }

  const sessionValues = decrypt(session);

  if (!sessionValues) {
    const url = request.nextUrl.clone();
    url.pathname = singinPage;
    return NextResponse.redirect(url);
  }

  return nextRespose;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}