// app/api/building/[...id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const idArray = Array.isArray(id) ? id : [id];

    if (req.method === 'GET') {
        try {
            // Jika id array length = 1, cari list lantai berdasarkan gedung
            if (idArray.length === 1) {
                const listOfFloors = await prisma.location.groupBy({
                    by: ['floor'],
                    where: { 
                        building: idArray[0] 
                    },
                    _count: {
                        floor: true,
                    }
                });
                return res.status(200).json({ data: listOfFloors });
            }
            // Jika id array length = 2, cari list ruangan berdasarkan gedung dan lantai
            else if (idArray.length === 2) {
                if(idArray[1]){
                    const listOfRooms = await prisma.location.findMany({
                        where: {
                            building: idArray[0],
                            floor: parseInt(idArray[1])
                        },
                        select: {
                            id: true,
                            room: true,
                            AC: true
                        }
                    });
                    return res.status(200).json({ data: listOfRooms });
                }
                res.status(400).json({ 
                    message: 'Invalid URL parameters'
                });
            }
            else {
                return res.status(400).json({ 
                    message: 'Invalid URL parameters'
                });
            }
        } catch (error) {
            return res.status(500).json({ 
                message: 'Server error', 
                detail: error 
            });
        }
    }
    // Jika bukan method GET
    else {
        return res.status(405).json({ 
            message: 'Method not allowed' 
        });
    }
}