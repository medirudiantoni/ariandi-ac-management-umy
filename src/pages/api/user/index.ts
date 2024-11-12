import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method === "POST"){
    try {
        const { username, email, password } = req.body;
        const existingEmail = await prisma.user.findUnique({ where: { email: email } });
        if(existingEmail){
            return res.status(409).json({ message: 'Email already exist' });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const member = 2;
        const result = await prisma.user.create({
            data: { username, email, password: hashedPassword, role_id: member }
        });
        res.json({
            message: 'CREATE new user success',
            data: result
        });
    } catch (error) {
        res.json({
            message: 'server error',
            deatil: error
        });
    }
} else if (req.method === "GET"){
    const session = await getSession({ req });
    if(!session){
        return res.status(403).json({
            message: 'Unauthorized'
        });
    } else {
        const { role }: any = session.user;
        if(role !== 'admin'){
            return res.status(403).json({
                message: 'Unauthorized user'
            });
        } else {
            try {
                const result = await prisma.user.findMany();
                res.json({
                    message: 'GET all data of users success',
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
  }
}
