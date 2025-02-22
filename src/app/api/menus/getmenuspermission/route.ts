import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import RoleMenuPermission from "@/models/RoleMenuPermissionModel";
import Menu from "@/models/menuModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserInfoData } from "@/utils/getUserInfo"; 
dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {

    console.log("request***** ", request);
    
    const decodedToken = getUserInfoData(request);
    console.log("decodedToken",decodedToken);
    

    const checkUser = await User.findOne({ where: { id: decodedToken.id } }) as User | null;
// console.log("checkUser", checkUser);

    if (!checkUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const rolePermissions = await RoleMenuPermission.findAll({
      where: { roleId: checkUser.role },
      attributes: ["menuId", "canCreate", "canRead", "canUpdate", "canDelete"],
    });
    // console.log("rolePermissions ", rolePermissions);

    const permissionsMap = rolePermissions.reduce((acc, perm) => {
      acc[perm.menuId] = {
        canCreate: perm.canCreate,
        canRead: perm.canRead,
        canUpdate: perm.canUpdate,
        canDelete: perm.canDelete,
      };
      return acc;
    }, {} as Record<number, any>);

    // console.log("permissionsMap *** ", permissionsMap);
    

    const menuIds = rolePermissions.map((perm) => perm.menuId);
    // console.log("menuIds *** ", menuIds);

    const allMenus = await Menu.findAll({
      where: { MenuId: menuIds },
      attributes: ["MenuId", "MenuName", "MenuUrl", "icon", "MenuParentId"],
    });
    // console.log("allMenus *** ", allMenus);

    const menuMap = new Map<number, any>();
    const rootMenus: any[] = [];

    allMenus.forEach((menu) => {
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
        Submenus: [],
      };
     
      

     menuMap.set(menu.MenuId, menuData);
    
    
    //  console.log("menu*** ",menu);

      if (menu.MenuParentId) {
        
        const parentMenu = menuMap.get(menu.MenuParentId);
        // console.log("parentMenu",parentMenu);


        if (parentMenu) {
          parentMenu.Submenus.push(menuData);
        }
      } else {
        rootMenus.push(menuData);
      }
    });
// console.log("root menus ", rootMenus);

    return NextResponse.json({
      message: "User menus fetched successfully",
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
