// import { PrismaClient } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient();

// // Define the menu structure
// const defaultMenus = [
//     { MenuId: 1, MenuName: "Dashboard", MenuParentId: null, MenuUrl: "/dashboard" },
//     { MenuId: 2, MenuName: "Company", MenuParentId: null, MenuUrl: "/dashboard/company" },
//     { MenuId: 3, MenuName: "Profile", MenuParentId: 2, MenuUrl: "/dashboard/company/profile" },
//     { MenuId: 4, MenuName: "Branches", MenuParentId: 2, MenuUrl: "/dashboard/company/branches" },
//     { MenuId: 5, MenuName: "Bank Accounts", MenuParentId: 2, MenuUrl: "/dashboard/company/accounts" },
//     { MenuId: 6, MenuName: "Documents", MenuParentId: 2, MenuUrl: "/dashboard/company/documents" },
    
//     { MenuId: 7, MenuName: "User Management", MenuParentId: null, MenuUrl: "/dashboard/user" },
//     { MenuId: 8, MenuName: "Role & Permissions", MenuParentId: 7, MenuUrl: "/dashboard/user/role" },
//     { MenuId: 9, MenuName: "Users", MenuParentId: 7, MenuUrl: "/dashboard/user/all" },
    
//     { MenuId: 10, MenuName: "HR Management", MenuParentId: null, MenuUrl: "/dashboard/hrmanagement" },
//     { MenuId: 11, MenuName: "Employee", MenuParentId: 10, MenuUrl: "/dashboard/hrmanagement/employee" },
//     { MenuId: 12, MenuName: "Attendance", MenuParentId: 10, MenuUrl: "/dashboard/hrmanagement/attendance" },
//     { MenuId: 13, MenuName: "Salary Disbursement", MenuParentId: 10, MenuUrl: "/dashboard/hrmanagement/salary" },
    
//     { MenuId: 14, MenuName: "Customer Management", MenuParentId: null, MenuUrl: "/dashboard/customer" },
//     { MenuId: 15, MenuName: "Customers", MenuParentId: 14, MenuUrl: "/dashboard/customer/all" },
//     { MenuId: 16, MenuName: "Minors", MenuParentId: 14, MenuUrl: "/dashboard/customer/minors" },
    
//     { MenuId: 17, MenuName: "Business Loan", MenuParentId: null, MenuUrl: "/dashboard/business" },
//     { MenuId: 18, MenuName: "Schemes", MenuParentId: 17, MenuUrl: "/dashboard/business/schemes" },
//     { MenuId: 19, MenuName: "Calculator", MenuParentId: 17, MenuUrl: "/dashboard/business/calculator" },
//     { MenuId: 20, MenuName: "Applications", MenuParentId: 17, MenuUrl: "/dashboard/business/applications" },
//     { MenuId: 21, MenuName: "Disbursements", MenuParentId: 17, MenuUrl: "/dashboard/business/disbursement" },
//     { MenuId: 22, MenuName: "Accounts", MenuParentId: 17, MenuUrl: "/dashboard/business/accounts" },
    
//     { MenuId: 23, MenuName: "Fixed Loan", MenuParentId: null, MenuUrl: "/dashboard/fixed" },
//     { MenuId: 24, MenuName: "Schemes", MenuParentId: 23, MenuUrl: "/dashboard/fixed/schemes" },
//     { MenuId: 25, MenuName: "Applications", MenuParentId: 23, MenuUrl: "/dashboard/fixed/applications" },
//     { MenuId: 26, MenuName: "Disbursements", MenuParentId: 23, MenuUrl: "/dashboard/fixed/disbursement" },
//     { MenuId: 27, MenuName: "Accounts", MenuParentId: 23, MenuUrl: "/dashboard/fixed/accounts" },
    
//     { MenuId: 28, MenuName: "Approvals", MenuParentId: null, MenuUrl: "/dashboard/approvals" },
//     { MenuId: 29, MenuName: "Accounting Vouchers", MenuParentId: 28, MenuUrl: "/dashboard/approvals/vouchers" },
//     { MenuId: 30, MenuName: "Loan Applications", MenuParentId: 28, MenuUrl: "/dashboard/approvals/loanapplications" },
//     { MenuId: 31, MenuName: "Pending Transactions", MenuParentId: 28, MenuUrl: "/dashboard/approvals/pendingtransactions" },
//     { MenuId: 32, MenuName: "Closure Requests", MenuParentId: 28, MenuUrl: "/dashboard/approvals/closurerequest" },
//     { MenuId: 33, MenuName: "Print Request Approvals", MenuParentId: 28, MenuUrl: "/dashboard/approvals/printrequest" },
//     { MenuId: 34, MenuName: "Loan Reschedule", MenuParentId: 28, MenuUrl: "/dashboard/approvals/loanreschedule" },
//     { MenuId: 35, MenuName: "Extension", MenuParentId: 28, MenuUrl: "/dashboard/approvals/extension" },
    
//     { MenuId: 36, MenuName: "Reports", MenuParentId: null, MenuUrl: "/dashboard/report" },
//     { MenuId: 37, MenuName: "Loan Balance Report", MenuParentId: 36, MenuUrl: "/dashboard/report/loanbalancereport" },
//     { MenuId: 38, MenuName: "Group Report", MenuParentId: 36, MenuUrl: "/dashboard/report/groupby" },
//     { MenuId: 39, MenuName: "Loan EMIs", MenuParentId: 36, MenuUrl: "/dashboard/report/loanemis" },
//     { MenuId: 40, MenuName: "TDS Report", MenuParentId: 36, MenuUrl: "/dashboard/report/tds" },
//     { MenuId: 41, MenuName: "Attendance Report", MenuParentId: 36, MenuUrl: "/dashboard/report/attendance" },
    
//     { MenuId: 42, MenuName: "Download Reports", MenuParentId: null, MenuUrl: "/dashboard/report/download" },
//     { MenuId: 43, MenuName: "Loan Payment Collections", MenuParentId: 42, MenuUrl: "/dashboard/report/download/loancollection" },
    
//     { MenuId: 44, MenuName: "CIBIL Reports", MenuParentId: null, MenuUrl: "/dashboard/cibil" },
//     { MenuId: 45, MenuName: "CIBIL Report History", MenuParentId: 44, MenuUrl: "/dashboard/cibil/history" },
    
//     { MenuId: 46, MenuName: "Software Settings", MenuParentId: null, MenuUrl: "/dashboard/setting" },
//     { MenuId: 47, MenuName: "Event | Holidays Calendar", MenuParentId: 46, MenuUrl: "/dashboard/setting/calendar" },
//     { MenuId: 48, MenuName: "Deleted Entry Logs", MenuParentId: 46, MenuUrl: "/dashboard/setting/deletedlogs" },
//     { MenuId: 49, MenuName: "User Activity Tracking", MenuParentId: 46, MenuUrl: "/dashboard/setting/logs" },
    
//     { MenuId: 50, MenuName: "Appointments", MenuParentId: null, MenuUrl: "/dashboard/appointment" },
//     { MenuId: 51, MenuName: "Notice Board", MenuParentId: null, MenuUrl: "/dashboard/noticeboard" },
//   ];
  
 
  

// async function clearDatabase() {
//   try {
//     await prisma.menu.deleteMany();
//     console.log("Existing menu records cleared.");
//   } catch (error) {
//     console.error("Error clearing the menu table:", error);
//     throw new Error("Failed to clear menu table");
//   }
// }

// async function seedMenus() {
//   try {
//     await clearDatabase();
//     console.log("Seeding Menus...");

//     for (const menu of defaultMenus) {
//       await prisma.menu.create({
//         data: {
//           MenuName: menu.MenuName,
//           MenuParentId: menu.MenuParentId,
//           MenuUrl: menu.MenuUrl,
//         },
//       });
//     }

//     console.log("Menu data seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding menu data:", error);
//     throw new Error("Failed to seed menu data");
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       console.log("Seeding database...");
//       await seedMenus();
//       res.status(200).json({ message: "Menu data seeded successfully" });
//     } catch (error: any) {
//       console.error("API error:", error);
//       res.status(500).json({
//         error: "Failed to seed database",
//         details: error.message || error,
//       });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }


// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const adminRoleId = 9; // Admin Role ID
// const userRoleId = 10; // Limited User Role ID
// const adminEmail = "prateek@gmail.com";
// const userEmail = "aktsln28@gmail.com";

// // Define full permissions for Admin
// const fullPermissions = {
//   canRead: true,
//   canCreate: true,
//   canUpdate: true,
//   canDelete: true,
// };

// // Define limited permissions for User (roleId: 10) with some submenus
// const limitedPermissions = [
//   { menuId: 3, canRead: true, canCreate: false, canUpdate: false, canDelete: false }, // Profile (Company Submenu)
//   { menuId: 7, canRead: true, canCreate: true, canUpdate: false, canDelete: false }, // User Management
//   { menuId: 15, canRead: true, canCreate: false, canUpdate: true, canDelete: false }, // Customers (Customer Management)
//   { menuId: 28, canRead: true, canCreate: false, canUpdate: false, canDelete: true }, // Approvals
// ];

// async function seedRolePermissions() {
//   try {
//     console.log("Seeding Role and User Permissions...");

//     // Step 1: Ensure users exist with their roles
//     let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
//     if (!adminUser) {
//       console.log(`Admin user (${adminEmail}) not found. Please ensure it exists.`);
//       return;
//     }

//     let limitedUser = await prisma.user.findUnique({ where: { email: userEmail } });
//     if (!limitedUser) {
//       console.log(`User (${userEmail}) not found. Please ensure it exists.`);
//       return;
//     }

//     // Step 2: Assign full access to Admin (roleId: 9)
//     console.log("Assigning full permissions to Admin...");
//     await prisma.roleMenuPermission.deleteMany({ where: { roleId: adminRoleId } }); // Clear existing permissions
//     const allMenus = await prisma.menu.findMany();
//     const adminPermissions = allMenus.map(menu => ({
//       roleId: adminRoleId,
//       menuId: menu.MenuId,
//       ...fullPermissions, // Full CRUD access
//     }));
//     await prisma.roleMenuPermission.createMany({ data: adminPermissions });

//     // Step 3: Assign limited access to User (roleId: 10)
//     console.log("Assigning limited permissions to User...");
//     await prisma.roleMenuPermission.deleteMany({ where: { roleId: userRoleId } }); // Clear existing permissions

//     // Get parent menus for the assigned submenus
//     const menuIds = limitedPermissions.map(perm => perm.menuId);
//     const parentMenus = await prisma.menu.findMany({
//       where: { MenuId: { in: menuIds } },
//       select: { MenuId: true, MenuParentId: true },
//     });

//     // Ensure parent menus are included if a submenu is assigned
//     const parentMenuIds = new Set<number>();
//     parentMenus.forEach(menu => {
//       if (menu.MenuParentId) {
//         parentMenuIds.add(menu.MenuParentId);
//       }
//     });

//     // Combine parent menus with limited permissions
//     const finalPermissions = [...limitedPermissions];

//     parentMenuIds.forEach(parentId => {
//       finalPermissions.push({
//         menuId: parentId,
//         canRead: true, // Ensure parent is at least readable
//         canCreate: false,
//         canUpdate: false,
//         canDelete: false,
//       });
//     });

//     // Insert limited permissions including necessary parents
//     await prisma.roleMenuPermission.createMany({
//       data: finalPermissions.map(perm => ({
//         roleId: userRoleId,
//         ...perm,
//       })),
//     });

//     console.log("Role permissions seeded successfully!");

//   } catch (error) {
//     console.error("Error seeding role permissions:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Run the seeding script
// seedRolePermissions();
