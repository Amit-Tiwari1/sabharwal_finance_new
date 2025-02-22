
import {  PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const allMenus = await prisma.menu.findMany({
      where: { MenuParentId: null },
      include: {
        Submenus: {
          orderBy: { MenuId: "asc" },
        },
      },
      orderBy: { MenuId: "asc" },
    });

    if (!allMenus || allMenus.length === 0) {
      return NextResponse.json(
        {
          errorMessage: "You do not have any menu permissions",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        successMessage: "Successful",
        success: true,
        result: allMenus,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
