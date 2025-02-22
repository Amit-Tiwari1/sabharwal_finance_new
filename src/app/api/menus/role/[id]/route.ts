import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";


const prisma = new PrismaClient()

export async function PUT(request:NextRequest,{params}:{params:{id:string}}){
    try {
        const data = await request.json();
        const updatedRole = await prisma.branch.update({
            where: {id: parseInt{params.id}},
            data,
        })
    } catch (error) {
        
    }

}