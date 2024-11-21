import AcDataType from "@/types/acData";
import LocType from "@/types/locData";
import { BuildingData, FloorData } from "@/types/teriversal";

export function calculateFloorData(data: LocType[]): FloorData[] {
    const floorMap: Record<string, FloorData> = {};

    data.forEach(({ building, floor, AC }) => {
        const key = `${building}-${floor}`;
        
        if (!floorMap[key]) {
            floorMap[key] = {
                building,
                floor: Number(floor),
                rooms: 0,
                total_ac: 0,
                condition_true: 0,
                condition_false: 0,
            };
        }

        const floorData = floorMap[key];
        floorData.rooms += 1;

        // Only proceed if `Ac` is defined and has elements
        if (AC && AC.length > 0) {
            floorData.total_ac += AC.length;

            // Count conditions
            AC.forEach((acUnit: AcDataType) => {
                if (acUnit.condition) {
                    floorData.condition_true += 1;
                } else {
                    floorData.condition_false += 1;
                }
            });
        }
    });

    return Object.values(floorMap);
}

export default function transformData(data: LocType[]): BuildingData[] {
    const buildingMap: Record<string, BuildingData> = {};

    data.forEach(({ building, floor, AC }) => {
        if (!buildingMap[building]) {
            buildingMap[building] = {
                building,
                floors: 0,
                rooms: 0,
                total_ac: 0,
                condition_true: 0,
                condition_false: 0,
            };
        }

        const buildingData = buildingMap[building];
        buildingData.rooms += 1;

        // Update floors if a new floor is encountered
        if (buildingData.floors < Number(floor)) {
            buildingData.floors = Number(floor);
        }

        // Only proceed if `Ac` is defined and has elements
        if (AC && AC.length > 0) {
            buildingData.total_ac += AC.length;

            // Count conditions
            AC.forEach((acUnit: AcDataType) => {
                if (acUnit.condition) {
                    buildingData.condition_true += 1;
                } else {
                    buildingData.condition_false += 1;
                }
            });
        }
    });

    return Object.values(buildingMap);
}