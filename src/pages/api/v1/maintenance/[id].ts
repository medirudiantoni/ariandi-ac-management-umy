import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query;
    if (req.method === 'GET'){
        try {
            const result = await prisma.maintenance.findUnique({
                where: { id: Number(id) },
                include: { AC: {
                    include: {
                        loc: true
                    }
                }}
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'PATCH'){
        const { coordinator, technician, description, maintenance_type } = req.body;
        try {
            const result = await prisma.maintenance.update({
                data: {
                    coordinator,
                    technician,
                    description,
                    maintenance_type
                },
                where: { id: Number(id) }
            });
            res.status(201).json({ message: 'update data success', data: result })
        } catch(error){
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'PUT'){
        const { end_date, cost, repair_details, replacement_details } = req.body;
        try {
            const result = await prisma.maintenance.update({
                data: {
                    end_date: String(end_date),
                    cost,
                    repair_details,
                    replacement_details,
                    status: "Selesai"
                },
                // { end_date, cost, repair_details, replacement_details, status }
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