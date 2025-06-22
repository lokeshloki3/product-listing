import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { sucess: false, error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({
      success: true,
      message: "Signup successful. Please log in.",
    });
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
