import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query;
    if (req.method === 'GET'){
        try {
            const result = await prisma.maintenance.findMany({
                where: { acId: Number(id) },
                include: { AC: true }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'PATCH'){
        const { acId, start_date, end_date, technician, cost, description, repair_details, replacement_details, maintenance_type, status } = req.body;
        try {
            const result = await prisma.maintenance.update({
                data: {
                    acId,
                    start_date: String(start_date),
                    end_date: String(end_date),
                    technician,
                    cost,
                    description,
                    repair_details,
                    replacement_details,
                    maintenance_type,
                    status
                },
                where: { id: Number(id) }
            });
            res.status(201).json({ message: 'update data success', data: result })
        } catch(error){
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'DELETE'){
        try {
            const result = await prisma.maintenance.delete({
                where: { id: Number(id) }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}