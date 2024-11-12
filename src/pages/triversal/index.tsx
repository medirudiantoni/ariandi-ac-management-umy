import BuildingCard from '@/components/elements/buildingCard'
import TopBar from '@/components/elements/topBar'
import transformData from '@/lib/transformDataLoc'
import { Grid2x2, ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Triversal = () => {
    const [isLoc, setLoc] = useState<any[]>([]);
    useEffect(() => {
        const getLoc = async () => {
            try {
                const response = await fetch(`/api/v1/location`).then(res => res.json());
                setLoc(transformData(response.data));
            } catch (error) {
                console.log(error)
            }
        };
        getLoc();
    }, []);

    return (
        <div className='w-full h-full bg-slate-50 relative pt-20'>
            <TopBar backButton={true} title='Triversal' search={true} />
            <div className="w-full h-fit flex items-center gap-0 p-5">
                <div className="flex-1 border-b-2 border-neutral-800 mr-4"></div>
                <button className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
                    <Grid2x2 />
                </button>
                <button className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
                    <ArrowUpDown />
                </button>
            </div>
            <div className="flex flex-col gap-2 w-full h-fit p-5 overflow-y-auto">
                {isLoc && isLoc.map((loc, id) => (
                    <BuildingCard key={id} href={`/triversal/${loc.building}`} name={loc.building} floors={loc.floors} rooms={loc.rooms} ac_units={loc.total_ac} not_operated={loc.condition_false} operating={loc.condition_true} />
                ))}
            </div>
        </div>
    )
}

export default Triversal