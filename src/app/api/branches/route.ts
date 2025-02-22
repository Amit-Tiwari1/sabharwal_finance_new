import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Check if openDate is provided
    if (!data.openDate) {
      return NextResponse.json(
        { success: false, errorMessage: "Open Date is required." },
        { status: 400 }
      );
    }

    // Convert openDate string to a Date object
    const formattedOpenDate = new Date(data.openDate);
    if (isNaN(formattedOpenDate.getTime())) {
      return NextResponse.json(
        { success: false, errorMessage: "Invalid openDate format." },
        { status: 400 }
      );
    }

    const newBranch = await prisma.branch.create({
      data: {
        ...data,
        openDate: formattedOpenDate, // Ensure it's stored as a DateTime
      },
    });

    return NextResponse.json(
      { success: true, successMessage: "Branch created successfully", result: newBranch },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating branch:", error);
    return NextResponse.json(
      { success: false, errorMessage: "Error creating branch" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, result: branches }, { status: 200 });
  } catch (error) {
    console.error("Error fetching branches:", error);
    return NextResponse.json(
      { success: false, errorMessage: "Error fetching branches" },
      { status: 500 }
    );
  }
}
