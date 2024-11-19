interface TriversalLocType {
    building: string;
    floors?: number;
    floor?: number;
    rooms: number;
    condition_true: number;
    condition_false: number;
    total_ac: number;
}

export type FloorData = {
    building: string;
    floor: number;
    rooms: number;
    total_ac: number;
    condition_true: number;
    condition_false: number;
};

export type BuildingData = {
    building: string;
    floors: number; 
    rooms: number;  
    total_ac: number;
    condition_true: number; 
    condition_false: number;
};

export default TriversalLocType;