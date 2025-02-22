import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const branch = await prisma.branch.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!branch) {
      return NextResponse.json({ success: false, errorMessage: "Branch not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, result: branch }, { status: 200 });
  } catch (error) {
    console.error("Error fetching branch:", error);
    return NextResponse.json({ success: false, errorMessage: "Error fetching branch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    const updatedBranch = await prisma.branch.update({
      where: { id: parseInt(params.id) },
      data,
    });

    return NextResponse.json(
      { success: true, successMessage: "Branch updated successfully", result: updatedBranch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating branch:", error);
    return NextResponse.json({ success: false, errorMessage: "Error updating branch" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.branch.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json(
      { success: true, successMessage: "Branch deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting branch:", error);
    return NextResponse.json({ success: false, errorMessage: "Error deleting branch" }, { status: 500 });
  }
}
