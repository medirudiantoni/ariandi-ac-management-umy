type AcData = {
    id: number;
    building: string;
    floor: number;
    room: number;
    Ac?: { id: number; brand: string; Condition: boolean }[];
};

type OutputData = {
    building: string;
    floors: number;
    rooms: number;
    total_ac: number;
    condition_true: number;
    condition_false: number;
};

// type AcData = {
//     id: number;
//     building: string;
//     floor: number;
//     room: number;
//     Ac?: { id: number; brand: string; Condition: boolean }[];
// };

type FloorData = {
    building: string;
    floor: number;
    rooms: number;
    total_ac: number;
    condition_true: number;
    condition_false: number;
};

export function calculateFloorData(data: any[]): FloorData[] {
    const floorMap: Record<string, FloorData> = {};

    data.forEach(({ building, floor, room, AC }) => {
        const key = `${building}-${floor}`;
        
        if (!floorMap[key]) {
            floorMap[key] = {
                building,
                floor,
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
            AC.forEach((acUnit: any) => {
                if (acUnit.Condition) {
                    floorData.condition_true += 1;
                } else {
                    floorData.condition_false += 1;
                }
            });
        }
    });

    return Object.values(floorMap);
}

export default function transformData(data: any[]): any[] {
    const buildingMap: Record<string, any> = {};

    data.forEach(({ building, floor, room, AC }) => {
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
        if (buildingData.floors < floor) {
            buildingData.floors = floor;
        }

        // Only proceed if `Ac` is defined and has elements
        if (AC && AC.length > 0) {
            buildingData.total_ac += AC.length;

            // Count conditions
            AC.forEach((acUnit: any) => {
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