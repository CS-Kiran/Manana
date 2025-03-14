import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, password } = await request.json();
    const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
    const domain = email.split('@')[1];

    // Validate email domain
    if (!allowedDomains.includes(domain)) {
      return NextResponse.json(
        { error: 'Invalid email domain' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}