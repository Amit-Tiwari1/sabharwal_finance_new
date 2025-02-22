import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const roleData = await request.json();
    const { roleName, roleDescription, permissions } = roleData;

    if (!roleName) {
      return NextResponse.json(
        { success:false,errorMessage: "Role name is not provided." },
        
        { status: 400 }
      );
    }

    const existingRole = await prisma.role.findUnique({
      where: {
        roleName: roleName.toLowerCase(),
      },
    });

    if (existingRole) {
      return NextResponse.json(
        { success:false,errorMessage: "Role already exists." },
        { status: 409 }
      );
    }

    const newRole = await prisma.role.create({
      data: {
        roleName,
        roleDescription: roleDescription || "No description provided",
      },
    });

    const permissionPromises = permissions.map((permission: any) => {
      return prisma.roleMenuPermission.create({
        data: {
          roleId: newRole.roleId,
          menuId: permission.menuId,
          canCreate: permission.canCreate || false,
          canRead: permission.canRead || true,
          canUpdate: permission.canUpdate || false,
          canDelete: permission.canDelete || false,
        },
      });
    });

    const newPermissions = await Promise.all(permissionPromises);

    if (!newPermissions || newPermissions.length === 0) {
      return NextResponse.json(
        { success:false,errorMessage: "Something went wrong while creating permissions." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success:true,
      successMessage: "Role and permissions created successfully.",
      status: 200,
      result: {
        role: newRole,
        permissions: newPermissions,
      },
    });
  } catch (error: any) {
return NextResponse.json({success:false,errorMessage:`${error.message}`})
   
  }
}


export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const allRoles = await prisma.role.findMany({
    });

    if (!allRoles || allRoles.length === 0) {
      return NextResponse.json(
        {
          errorMessage: "No roles found.",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      successMessage: "Roles fetched successfully",
      success: true,
      result: allRoles,
    }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json(
      {
        success: false,
        errorMessage: error.message || "An error occurred while fetching roles.",
      },
      { status: 500 }
    );
  }
}
