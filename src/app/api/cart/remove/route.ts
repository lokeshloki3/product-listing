import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const token = req.cookies.get("token")?.value;
  const userPayload = verifyToken(token || "");
  if (!userPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  const user = await User.findById(userPayload.userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  user.cart = user.cart.filter((item: any) => item.id !== productId);
  await user.save();

  return NextResponse.json({ success: true });
}

