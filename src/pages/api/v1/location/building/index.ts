import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        try {
            const listOfBuilding = await prisma.location.groupBy({
                by: ['building'],
                _count: {
                    building: true,
                    floor: true,
                    room: true
                }
            });
            res.status(200).json({ data: listOfBuilding });
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}