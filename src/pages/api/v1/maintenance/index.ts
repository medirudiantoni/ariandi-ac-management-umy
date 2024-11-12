import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const { acId, start_date, technician, description, maintenance_type, coordinator } = req.body;
        try {
            const result = await prisma.maintenance.create({
                data: {
                    acId,
                    start_date: String(start_date),
                    technician,
                    description,
                    maintenance_type,
                    status: "Sedang berlangsung",
                    coordinator
                }
            });
            res.status(201).json({ message: 'Create new maintainance data success', data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'GET'){
        try {
            const result = await prisma.maintenance.findMany({
                include: { AC: true }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}