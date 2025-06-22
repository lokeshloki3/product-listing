import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const token = req.cookies.get("token")?.value;
  const userPayload = verifyToken(token || "");
  if (!userPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userPayload.userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ cart: user.cart });
}