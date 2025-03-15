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
      const { currentPassword, newPassword } = req.body;
      const { userId } = req.query;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "userId as a query is required!" });
      }
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const validatedCurrentPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!validatedCurrentPassword) {
        return res.status(403).json({ message: "Invalid password" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          password: hashedNewPassword,
        },
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
