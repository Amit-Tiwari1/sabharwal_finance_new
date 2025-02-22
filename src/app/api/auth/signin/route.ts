import { NextResponse } from "next/server";
import { userLoginDataType } from "@/app/utils/interface";
import { checkUserLoginValidationError } from "@/app/utils/userValidationSchema";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET() {
  return NextResponse.json({ successMessage: "Route is working" });
}

export async function POST(request: Request) {
  try {
    const userData: userLoginDataType = await request.json();
    console.log("Received user data:", userData);

    const { identifier, password } = userData;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, errorMessage: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    const trimmedIdentifier = identifier.trim();
    const validationErrors = checkUserLoginValidationError({ identifier: trimmedIdentifier, password });

    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errorMessage: validationErrors[0] }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: trimmedIdentifier }, { username: trimmedIdentifier }],
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, errorMessage: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ success: false, errorMessage: "Incorrect password" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables.");
      return NextResponse.json({ success: false, errorMessage: "Internal server error" }, { status: 500 });
    }

    const algo = process.env.JWT_ALGO || "HS256";
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: algo })
      .setExpirationTime("12h")
      .sign(secretKey);

    const response = NextResponse.json(
      {
        success: true,
        result: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          profilepic: user.userpic,
          mobilenumber: user.mobilenumber,
          email: user.email,
          role: user.roleId,
          address: user.address1,
          city: user.city,
          state: user.state,
          isactive: user.isactive,
          isdeleted: user.isdeleted,
          createdAt:user.createdAt
        },
      },
      { status: 200 }
    );

    response.cookies.set("jwt", token, {
      maxAge: 60 * 60 * 12, 
      
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, errorMessage: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
