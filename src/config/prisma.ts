import * as Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

export const prismaConnect = async()=>{
    
    try {
        await prisma.$connect();
        console.log("Prisma connected successfully");
    } catch (err) {
        console.error("Error connecting to Prisma:");
    }
};


export default prisma;