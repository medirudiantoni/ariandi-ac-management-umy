import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const { unit_code, brand, type, PK, condition, loc_id, installed_at } = req.body;
        try {
            const result = await prisma.aC.create({
                data: {
                    unit_code,
                    brand,
                    type,
                    PK,
                    condition,
                    loc_id,
                    installed_at
                }
            });
            res.status(201).json({ message: 'Create new AC data success', data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error', detail: error })
        }
    } else if (req.method === 'GET'){
        try {
            const result = await prisma.aC.findMany({
                include: { loc: true }
            });
            const serializedResult = result.map(item => ({
                ...item,
                installed_at: item.installed_at.toString()
            }));
            res.status(200).json({ data: serializedResult })
        } catch (error) {
            res.status(500).json({ message: 'Server error from ac/index.ts', detail: error })
        }
    }
}