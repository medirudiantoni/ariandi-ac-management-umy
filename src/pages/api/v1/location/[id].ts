import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query;
    if (req.method === 'GET'){
        try {
            const result = await prisma.location.findUnique({
                where: { id: Number(id) },
                include: { AC: true }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'PATCH'){
        const { name, building, floor, room } = req.body;
        try {
            const result = await prisma.location.update({
                data: {
                    name,
                    alias: `${building} ${floor}${room.length < 2 ? '0' + room : room}`,
                    building,
                    floor,
                    room
                },
                where: { id: Number(id) }
            });
            res.status(201).json({ message: 'update data success', data: result })
        } catch(error){
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'DELETE'){
        try {
            const result = await prisma.location.delete({
                where: { id: Number(id) }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}