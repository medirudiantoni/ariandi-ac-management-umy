import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Floor = {
  roomCount: number;
};

// Tipe untuk data yang akan di-insert ke database
type LocationData = {
  building: string;
  floor: number;
  room: number;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { building, floors } = req.body;
    try {
      const dataToInsert: LocationData[] = [];

      floors.forEach((floor: Floor, floorId: number) => {
        const floorNumber = floorId + 1;

        for (let roomNumber = 1; roomNumber <= floor.roomCount; roomNumber++) {
          dataToInsert.push({
            building,
            floor: floorNumber,
            room: roomNumber,
          });
        }
      });

      const result = await prisma.location.createMany({
        data: dataToInsert,
      });

      res
        .status(201)
        .json({ message: "Create new locations successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Server error", detail: error });
    }
  } else {
    res.status(500).json({ message: "Server error" });
  }
}
