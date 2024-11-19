import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { query } = req.query;
    if(req.method === "GET"){
        try {
            const result = await prisma.location.findMany({
                where: {
                    OR: [
                        { alias: { contains: String(query), mode: 'insensitive'  } },
                        { building: { contains: String(query), mode: 'insensitive' } },
                        { name: { contains: String(query), mode: 'insensitive' } },
                        { floor: { contains: String(query), mode: 'insensitive' } },
                        { room: { contains: String(query), mode: 'insensitive' } },
                        { fakultas: { contains: String(query), mode: 'insensitive' } },
                        { prodi: { contains: String(query), mode: 'insensitive' } },
                    ]
                },
                include: {
                    AC: {
                        include: {
                            loc: true
                        }
                    }
                }
            })
            console.log(result)
            res.status(201).json({ message: 'get search result', data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}