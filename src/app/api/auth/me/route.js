import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { jwtVerify } from "jose";

export async function GET(req) {
  try {
    await dbConnect();
    
    // ✅ Read token from cookies
    const token = req.cookies.get("session")?.value;
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // ✅ Verify JWT
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const user = await User.findById(payload.userId).select("-password");

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
