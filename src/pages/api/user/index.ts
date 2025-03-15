import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";
import { RoleSesssion } from "@/types/user";
import prisma from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      if (!username) {
        return res.status(400).json({
          message: "Username is required!",
        });
      }
      if (!email) {
        return res.status(400).json({
          message: "Email is required!",
        });
      }
      if (!password) {
        return res.status(400).json({
          message: "Password is required!",
        });
      }
      const existingEmail = await prisma.user.findUnique({
        where: { email: email },
      });
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = 4;
      const result = await prisma.user.create({
        data: { username, email, password: hashedPassword, role_id: user },
      });
      res.json({
        message: "CREATE new user success",
        data: result,
      });
    } catch (error) {
      res.json({
        message: "server error",
        deatil: error,
      });
    }
  } else if (req.method === "GET") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    } else {
      const { role }: RoleSesssion = session.user;
      if (role !== "Admin") {
        return res.status(403).json({
          message: "Unauthorized user",
        });
      } else {
        try {
          const result = await prisma.user.findMany({
            include: {
              role: true
            }
          });
          res.json({
            message: "GET all data of users success",
            users: result,
          });
        } catch (error) {
          res.json({
            message: "server error",
            deatil: error,
          });
        }
    }
}
} else if (req.method === "PATCH"){
    try {
        const { password } = req.body;
        const { userId } = req.query;
        if(!userId){
          return res.status(400).json({ message: "userId as a query is required!" });
        };
        const user = await prisma.user.findUnique({
          where: { id: Number(userId) }
        });
        if(!user){
          return res.status(404).json({ message: "user not found" });
        };
        const validatedCurrentPassword = await bcrypt.compare(password, user.password);
        if(!validatedCurrentPassword){
          return res.status(403).json({ message: "Invalid password" });
        };
        const hashedNewPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { id: Number(userId) },
          data: {
            password: hashedNewPassword
          }
        });
        res.status(201).json({
          message: "Change password successfully",
        });
    } catch (error) {
        res.json({
          message: "server error",
          deatil: error,
        });
    }
  }
}
