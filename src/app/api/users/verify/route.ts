import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json({ isAuthenticated: true, user });
}
