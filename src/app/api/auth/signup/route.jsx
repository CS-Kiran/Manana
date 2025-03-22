import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const { name, email: rawEmail, password } = await request.json();
    const email = rawEmail.trim().toLowerCase();
    const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];
    const domain = email.split("@")[1];

    if (!allowedDomains.includes(domain)) {
      return NextResponse.json(
        { error: "Invalid email domain" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters with one uppercase letter",
        },
        { status: 400 }
      );
    }

    const user = await User.create({
      name: name.trim(),
      email,
      password: password.trim(),
      provider: "credentials",
    });

    return NextResponse.json(
      {
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}