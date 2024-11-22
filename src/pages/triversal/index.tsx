import BuildingCard from '@/components/elements/buildingCard';
import TriversalSkeleton from '@/components/elements/skeletons/triversalSkeletons';
import TopBar from '@/components/elements/topBar';
import transformData from '@/lib/transformDataLoc';
import { useLocations } from '@/lib/zustand';
import React, { useEffect, useState } from 'react';

interface TriversalLocType {
    building: string;
    floors: number;
    rooms: number;
    condition_true: number;
    condition_false: number;
    total_ac: number;
}

const Triversal = () => {
    const [isLoc, setLoc] = useState<TriversalLocType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const locationsData = useLocations(state => state.locationsData);
    const setDataLoc = useLocations(state => state.setDataLoc);

    useEffect(() => {
        const getLoc = async () => {
            try {
                const response = await fetch(`/api/v1/location`).then(res => res.json());
                setLoc(transformData(response.data));
                setDataLoc(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        };
        if(locationsData.length > 0){
            setLoc(transformData(locationsData));
        } else {
            setIsLoading(true);
            getLoc();
        }
    }, [locationsData]);

    if(isLoading){
        return <TriversalSkeleton />
    }

    return (
        <div className='w-full h-full bg-slate-50 relative pt-20'>
            <TopBar backButton={true} title='Triversal' search={true} />
            <div className="flex flex-col gap-2 w-full h-fit p-5 overflow-y-auto">
                {isLoc && isLoc.map((loc, id) => (
                    <BuildingCard key={id} href={`/triversal/${loc.building}`} name={loc.building} floors={loc.floors} rooms={loc.rooms} ac_units={loc.total_ac} not_operated={loc.condition_false} operating={loc.condition_true} />
                ))}
            </div>
        </div>
    )
}

export default Triversal