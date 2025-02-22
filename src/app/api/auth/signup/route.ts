// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import { writeFile } from "fs/promises";
// import path from "path";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     console.log("📦 Parsed form data:", formData);
//     const username = formData.get("username") as string;
//     const fullName = formData.get("fullName") as string;
//     const email = formData.get("email") as string;
//     const mobilenumber = formData.get("mobilenumber") as string;
//     const roleId = parseInt(formData.get("roleId") as string);
//     const basicsalary = parseFloat(formData.get("basicsalary") as string);
//     const address1 = formData.get("address1") as string;
//     const city = formData.get("city") as string;
//     const state = formData.get("state") as string;
//     const pin = formData.get("pin") as string;
//     const password = formData.get("password") as string;
//     const userpic = formData.get("userpic") as File | null;

//     if (!username || !fullName || !email || !mobilenumber || !password) {
//       return NextResponse.json(
//         { success: false, errorMessage: "All fields are required." },
//         { status: 400 }
//       );
//     }
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, errorMessage: "Email already exists." },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     let userImageUrl = "/profilepic/users/default_profile_pic.png";
//     if (userpic) {
//       const timestamp = new Date().toISOString().replace(/[-:T.]/g, "_");
//       const extension = userpic.name.split(".").pop();
//       const imageName = `${username}_${timestamp}.${extension}`;
//       const imagePath = path.join(process.cwd(), "public", "profilepic", "users", imageName);

//       const imageBuffer = Buffer.from(await userpic.arrayBuffer());
//       await writeFile(imagePath, imageBuffer);

//       userImageUrl = `/profilepic/users/${imageName}`;
//     }

//     const createdUser = await prisma.user.create({
//       data: {
//         username,
//         fullName,
//         email,
//         mobilenumber,
//         roleId,
//         basicsalary,
//         address1,
//         city,
//         state,
//         pin,
//         password: hashedPassword,
//         userpic: userImageUrl,
//       },
//     });


//     return NextResponse.json({
//       success: true,
//       successMessage: "User created successfully.",
//       result: {
//         id: createdUser.id,
//         username: createdUser.username,
//         fullName: createdUser.fullName,
//         email: createdUser.email,
//         userpic: createdUser.userpic,
//         city:createdUser.city,
//         state:createdUser.state,
//         address1:createdUser.address1,
//         mobilenumber:createdUser.mobilenumber,
//       },
//     });
//   } catch (error:any) {
//     return NextResponse.json(
//       { success: false, errorMessage:`${error.message}` },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const mobilenumber = formData.get("mobilenumber") as string;
    const roleId = parseInt(formData.get("roleId") as string);
    const basicsalary = parseFloat(formData.get("basicsalary") as string);
    const address1 = formData.get("address1") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pin = formData.get("pin") as string;
    const password = formData.get("password") as string;
    const userpic = formData.get("userpic") as File | null;

    // ✅ Fix: Convert branches to an array of numbers
    const branches = formData.get("branches")?.toString().split(",").map(Number) || [];

    console.log("✅ Processed Branches:", branches);

    if (!username || !fullName || !email || !mobilenumber || !password) {
      return NextResponse.json(
        { success: false, errorMessage: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, errorMessage: "Email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userImageUrl = "/profilepic/users/default_profile_pic.png";
    if (userpic) {
      const timestamp = new Date().toISOString().replace(/[-:T.]/g, "_");
      const extension = userpic.name.split(".").pop();
      const imageName = `${username}_${timestamp}.${extension}`;
      const imagePath = path.join(process.cwd(), "public", "profilepic", "users", imageName);

      const imageBuffer = Buffer.from(await userpic.arrayBuffer());
      await writeFile(imagePath, imageBuffer);

      userImageUrl = `/profilepic/users/${imageName}`;
    }

    // ✅ Create user and assign branches properly
    const createdUser = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        mobilenumber,
        roleId,
        basicsalary,
        address1,
        city,
        state,
        pin,
        password: hashedPassword,
        userpic: userImageUrl,
        branches: {
          create: branches.map((branchId) => ({
            branch: { connect: { id: branchId } }, // ✅ Now passing correct `id`
          })),
        },
      },
      include: {
        branches: { include: { branch: true } }, // ✅ Include branch details in response
      },
    });

    return NextResponse.json({
      success: true,
      successMessage: "User created successfully.",
      result: {
        id: createdUser.id,
        username: createdUser.username,
        fullName: createdUser.fullName,
        email: createdUser.email,
        userpic: createdUser.userpic,
        city: createdUser.city,
        state: createdUser.state,
        address1: createdUser.address1,
        mobilenumber: createdUser.mobilenumber,
        branches: createdUser.branches.map((b) => ({
          id: b.branch.id,
          branchName: b.branch.branchName,
        })), // ✅ Send clean branch data
      },
    });
  } catch (error: any) {
    console.error("❌ Error Creating User:", error);
    return NextResponse.json(
      { success: false, errorMessage: `${error.message}` },
      { status: 500 }
    );
  }
}
