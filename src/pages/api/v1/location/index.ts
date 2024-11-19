import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const { name, building, floor, room } = req.body;
        try {
            const result = await prisma.location.create({
                data: {
                    name,
                    alias: `${building} ${floor}${room.length < 2 ? '0' + room : room}`,
                    building,
                    floor,
                    room: `${floor}${room.length < 2 ? '0' + room : room}`
                }
            });
            console.log(result)
            res.status(201).json({ message: 'Create new location data success', data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'GET'){
        try {
            const result = await prisma.location.findMany({
                include: { AC: true }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}