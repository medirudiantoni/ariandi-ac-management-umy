import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query;
    if (req.method === 'GET'){
        try {
            const result = await prisma.aC.findUnique({
                where: { id: Number(id) },
                include: { loc: true, Maintenance: true }
            });
            console.log(result)
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if(req.method === 'PATCH'){
        const { condition, status } = req.body;
        try {
            await prisma.aC.update({
                where: { id: Number(id) },
                data: {
                    condition,
                    status,
                    is_broken: false
                }
            });
            res.status(201).json({ message: "set status ac: Under maintenance" });
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error });
        }
    } else if (req.method === 'PUT'){
        const { unit_code, brand, type, PK, condition, loc_id, installed_at } = req.body;
        try {
            const result = await prisma.aC.update({
                data: {
                    unit_code,
                    brand,
                    type,
                    PK,
                    condition,
                    loc_id,
                    installed_at
                },
                where: { id: Number(id) }
            });
            res.status(201).json({ message: 'Update AC data success', data: result })
        } catch(error){
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'DELETE'){
        try {
            const result = await prisma.aC.delete({
                where: { id: Number(id) }
            });
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    }
}