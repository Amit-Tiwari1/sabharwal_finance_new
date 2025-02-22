import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const AutorizationIntence = await headers();
  try {
    const BearerToken = AutorizationIntence.get("authorization") as string;


  const token = BearerToken.split(" ")[1];
  if(!token){
    return NextResponse.json({ success: false, errorMessage: "Token not found" }, { status: 401 });

  }
  
const payload = jwt.decode(token) as {email:string}
 
const userData = await prisma.user.findUnique({
  where: { email: payload.email.toLowerCase().trim() },
  select: {
    id: true,
    email: true,
    username: true,
    fullName:true,
    city: true,
    mobilenumber: true,
    state: true,
    userpic: true,
    createdAt: true,
    roleId: true,
    address1: true,
    isactive: true,
    isdeleted: true,
  },
});

  
  if (!userData) {
    return NextResponse.json({ success: false, errorMessage: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      success: true,
      result: {
        id: userData.id,
        username: userData.username,
        fullName: userData.fullName,
        profilepic: userData.userpic,
        mobilenumber: userData.mobilenumber,
        email: userData.email,
        role: userData.roleId,
        address: userData.address1,
        city: userData.city,
        state: userData.state,
        isactive: userData.isactive,
        isdeleted: userData.isdeleted,
        createdAt: userData.createdAt,
      },
    },
    { status: 200 }
  );
  } catch (error:any) {
  return NextResponse.json({ success: false, errorMessage:`${error.message}` });
    
  }
}
