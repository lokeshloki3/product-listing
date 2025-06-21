// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/");
  res.cookies.set("token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return res;
}
