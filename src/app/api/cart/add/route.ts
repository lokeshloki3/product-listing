import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }

    const userPayload = verifyToken(token);
    if (!userPayload) {
      console.log("Invalid token");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const product = await req.json();
    if (!product || !product.id || !product.title || !product.price || !product.thumbnail) {
      return NextResponse.json({ message: "Invalid product data" }, { status: 400 });
    }

    const user = await User.findById(userPayload.userId);
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const exists = user.cart.some((item: { id: number }) => item.id === product.id);
    if (!exists) {
      user.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      });

      await user.save();
      console.log("Saved cart:", user.cart);
    } else {
      console.log("Product already in cart");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json({ success: false, error: "Failed to add product to cart" }, { status: 500 });
  }
}