import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(request: NextRequest) {
  try {
    const BearerToken = request.headers.get("authorization");
    if (!BearerToken) {
      return new NextResponse(
        JSON.stringify({ success: false, errorMessage: "Bearer Token Not Found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const token = BearerToken.split(" ")[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, errorMessage: "Token Not Found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    let payload;
    try {
      const { payload: verifiedPayload } = await jose.jwtVerify(token, secretKey);
      payload = verifiedPayload as { email: string };
      console.log("JWT Payload:", payload);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ success: false, errorMessage: "Unauthorized Token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error("Middleware Error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, errorMessage: "Internal Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
