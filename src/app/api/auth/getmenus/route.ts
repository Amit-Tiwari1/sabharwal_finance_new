
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
     const AutorizationIntence = await headers();
        const BearerToken = AutorizationIntence.get("authorization") as string;
    
      const token = BearerToken.split(" ")[1];
      if(!token){
        return NextResponse.json({ success: false, errorMessage: "Token not found" }, { status: 401 });
    
      }
      
    const payload = jwt.decode(token) as {id:number}

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { roleId: true },
    });

    if (!user) {
      return NextResponse.json({ success: false,errorMessage: "User not found." }, { status: 404 });
    }

    const roleId = user.roleId;

    // Step 2: Fetch Role-Based Menu Permissions
    const rolePermissions = await prisma.roleMenuPermission.findMany({
      where: { roleId },
      select: {
        menuId: true,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
      },
    });

    if (!rolePermissions.length) {
      return NextResponse.json({ success: false,errorMessage: "No menu permissions found for this role." }, { status: 403 });
    }

    // Step 3: Create Permissions Map
    const permissionsMap = rolePermissions.reduce((acc, perm) => {
      acc[perm.menuId] = {
        canCreate: perm.canCreate,
        canRead: perm.canRead,
        canUpdate: perm.canUpdate,
        canDelete: perm.canDelete,
      };
      return acc;
    }, {} as Record<number, any>);

    // Step 4: Get Assigned Menu IDs
    const menuIds = rolePermissions.map((perm) => perm.menuId);

    // Step 5: Fetch Assigned Menus and Their Parents
    const assignedMenus = await prisma.menu.findMany({
      where: { MenuId: { in: menuIds } },
      select: { MenuId: true, MenuName: true, MenuUrl: true, icon: true, MenuParentId: true },
    });

    // Get Parent Menus if Needed
    const parentIds = new Set<number>();
    assignedMenus.forEach((menu) => {
      if (menu.MenuParentId) parentIds.add(menu.MenuParentId);
    });

    // Fetch Parent Menus if Not Already Included
    const parentMenus = await prisma.menu.findMany({
      where: { MenuId: { in: Array.from(parentIds) } },
      select: { MenuId: true, MenuName: true, MenuUrl: true, icon: true, MenuParentId: true },
    });

    // Merge Parent Menus with Assigned Menus
    const allMenus = [...assignedMenus, ...parentMenus];

    // Step 6: Build Nested Menu Tree
    const menuMap = new Map<number, any>();
    const rootMenus: any[] = [];
    const addedMenuIds: Set<number> = new Set();

    allMenus.forEach((menu) => {
      if (addedMenuIds.has(menu.MenuId)) {
        console.log(`Duplicate MenuId: ${menu.MenuId} found, skipping.`);
        return; 
      }
      addedMenuIds.add(menu.MenuId);

      const menuData = {
        MenuId: menu.MenuId,
        MenuName: menu.MenuName,
        MenuUrl: menu.MenuUrl,
        icon: menu.icon,
        MenuParentId: menu.MenuParentId,
        permissions: permissionsMap[menu.MenuId] || {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
        },
        submenus: [],
      };

      menuMap.set(menu.MenuId, menuData);

      if (menu.MenuParentId) {
        const parentMenu = menuMap.get(menu.MenuParentId);
        if (parentMenu) {
          parentMenu.submenus.push(menuData);
        }
      } else {
        rootMenus.push(menuData);
      }
    });

    rootMenus.forEach((parent) => {
      parent.submenus.forEach((submenu:any) => {
        delete submenu.submenus;
      });
    });

    return NextResponse.json({
      successMessage: "User menus fetched successfully",
      success: true,
      userMenus: rootMenus,
    });
  } catch (error) {
    console.error("ERROR during fetching user menus:", (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error during fetching user menus" },
      { status: 500 }
    );
  }
}

