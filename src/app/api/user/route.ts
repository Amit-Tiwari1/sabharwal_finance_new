import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function GET(request: NextRequest): Promise<NextResponse> {
//   try {
//     const allUserList = await prisma.user.findMany({
//       where: { isdeleted: false },
//       select: {
//         id: true,
//         username: true,
//         fullName: true,
//         email: true,
//         mobilenumber: true,
//         roleId: true,
//         address1: true,
//         city: true,
//         state: true,
//         pin: true,
//         userpic: true,
//         basicsalary: true,
//         isactive:true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });


//     if (!allUserList.length) {
//       console.log("⚠️ No users found.");
//       return NextResponse.json(
//         { errorMessage: "No record found", success: false },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { successMessage: "Successful", success: true, result: allUserList },
//       { status: 200 }
//     );
//   } catch (error:any) {
//     console.error("🚨 Error fetching users:", error);
//     return NextResponse.json(
//       {  success: false, errorMessage: error.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }


export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const allUserList = await prisma.user.findMany({
      where: { isdeleted: false },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        mobilenumber: true,
        role: { 
          select: {
            roleId: true,
            roleName: true,
          },
        },
        address1: true,
        city: true,
        state: true,
        pin: true,
        userpic: true,
        basicsalary: true,
        isactive: true,
        createdAt: true,
        updatedAt: true,
        // ✅ Fetching branches through UserBranch relation
        branches: {
          select: {
            branch: {
              select: {
                id: true,
                branchName: true,
              },
            },
          },
        },
      },
    });

    // ✅ Formatting response to flatten branch data
    const formattedUsers = allUserList.map((user) => ({
      ...user,
      branches: user.branches.map((b) => ({
        id: b.branch.id,
        branchName: b.branch.branchName,
      })),
    }));

    if (!formattedUsers.length) {
      return NextResponse.json(
        { errorMessage: "No record found", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { successMessage: "Successful", success: true, result: formattedUsers },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error Fetching Users:", error);
    return NextResponse.json(
      { success: false, errorMessage: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}

