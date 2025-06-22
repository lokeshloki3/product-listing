import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  console.log("MIDDLEWARE:", req.nextUrl.pathname);

  const token = req.cookies.get('token')?.value;

  if (req.nextUrl.pathname.startsWith('/cart')) {
    if (!token || !verifyToken(token)) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart/:path*'],
};
