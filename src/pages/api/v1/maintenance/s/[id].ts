import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query;
    if (req.method === 'GET'){
        try {
            const result = await prisma.maintenance.findMany({
                where: { acId: Number(id) },
                include: { AC: {
                    include: {
                        loc: true
                    }
                }},
                orderBy: {
                    id: 'desc'
                }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else {
        res.status(501).json({ message: "Method not allowed" })
    }
}