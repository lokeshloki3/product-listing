import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User"; // Your user model

export async function POST(req) {
  try {
    const { email, product } = await req.json(); // get user + product

    if (!email || !product) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URL); // add this to your .env.local

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingItem = user.cart.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push(product);
    }

    await user.save();

    return NextResponse.json({ message: "Cart updated" });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
