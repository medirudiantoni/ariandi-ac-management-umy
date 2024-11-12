import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method === "POST"){
    try {
        const { title } = req.body;
        const existingRole = await prisma.role.findUnique({ where: { title: title } });
        if(existingRole){
            return res.json({ message: 'role already exist' });
        }
        const result = await prisma.role.create({
            data: { title }
        });
        res.json({
            message: 'CREATE new role success',
            data: result
        });
    } catch (error) {
        res.json({
            message: 'server error',
            deatil: error
        });
    }
} else if (req.method === "GET"){
    try {
        const result = await prisma.role.findMany();
        res.json({
            message: 'GET all data of role success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'server error',
            deatil: error
        });
    }
  }
}
