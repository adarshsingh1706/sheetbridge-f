import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db"; // Ensure database connection
import User from "@/models/User"; // Import the User model

export async function POST(req) {
  try {
    await dbConnect(); // Connect to the database

    const { email, password } = await req.json();
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user correctly
    const user = await User.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Create response with HTTP-only cookie
    // const response = NextResponse.json({ 
    //   user: { 
    //     id: user._id, 
    //     email: user.email 
    //   } 
    // });

    // response.cookies.set("session", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7200, // 2 hours
    //   path: "/",
    // });

    
    const response = NextResponse.json({ 
      success: true,
      user: { id: user._id, email: user.email } 
    });

    // Set secure HTTP-only cookie
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
