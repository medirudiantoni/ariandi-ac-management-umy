import AcCard from '@/components/elements/acCard';
import RoomCard from '@/components/elements/roomCard';
import TopBar from '@/components/elements/topBar'
import transformData, { calculateFloorData } from '@/lib/transformDataLoc';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Navigate = () => {
    const { query } = useRouter();
    const [isLoc, setIsLoc] = useState([]);
    const [isLocBuilding, setIsLocBuilding] = useState<any>({});
    const [isLocFloor, setIsLocFloor] = useState<any>([]);
    const [isLocRoom, setIsLocRoom] = useState<any>([]);

    useEffect(() => {
        const savedFloor = sessionStorage.getItem('selectedFloor');
        const savedRooms = sessionStorage.getItem('selectedRooms');

        if (savedFloor) {
            // Restore selected floor and rooms from sessionStorage
            setIsLocRoom(JSON.parse(String(savedRooms)));
        }
        const getLoc = async () => {
            try {
                const response = await fetch(`/api/v1/location`).then(res => res.json());
                setIsLocBuilding(transformData(response.data).find(loc => loc.building == query.id));
                const floorsOfTheBuilding = calculateFloorData(response.data).filter((data: any) => data.building == query.id);
                setIsLocFloor(floorsOfTheBuilding);
                setIsLoc(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        getLoc();
    }, []);

    const getAcPerFloor = (floor: any) => {
        const result = isLoc.filter((data: any) => data.building == query.id && data.floor == floor);
        setIsLocRoom(result);

        // Save selected floor and rooms to sessionStorage
        sessionStorage.setItem('selectedFloor', floor);
        sessionStorage.setItem('selectedRooms', JSON.stringify(result));
    }

    // useEffect(() => {
    //     isLocRoom.map((loc: any) => console.log(loc));
    // }, [isLocRoom])

    return (
        <div className="w-full h-full bg-slate-50 pt-16">
            <TopBar backButton={true} title={String(query.id)} search={true} />
            <div className="w-full h-full p-5 mb-5">
                <div className="w-full h-fit p-4 rounded-2xl bg-blue-100">
                    <div className="flex justify-between">
                        <p>{isLocBuilding && isLocBuilding.floors} Lantai</p>
                        <p>{isLocBuilding && isLocBuilding.rooms} Ruangan</p>
                    </div>
                </div>
                <div className="w-full h-fit p-4 rounded-2xl bg-blue-200">
                    <div className="w-full flex gap-2 pb-2 justify-center border-b">
                        <p>Total Ac</p>
                        <p>
                            <span className="text-2xl font-semibold">{isLocBuilding && isLocBuilding.total_ac} </span>
                            <span className="text-sm">unit</span>
                        </p>
                    </div>
                    <div className="w-full flex gap-2 justify-between pt-2">
                        <p>{isLocBuilding && isLocBuilding.condition_true} unit normal</p>
                        <p>{isLocBuilding && isLocBuilding.condition_false} unit rusak</p>
                    </div>
                </div>
                <div className="w-full h-fit flex gap-2 py-4">
                    <select onChange={e => getAcPerFloor(e.target.value)} name="lantai" id="lantai" className='py-2 px-4 flex-1 border-2 rounded-xl'>
                        <option value="">Pilih Lantai</option>
                        
                        {isLocFloor && isLocFloor.map((data: any, id: number) => (
                            <option key={id} value={data.floor}>Lantai {data.floor}</option>
                        ))}
                    </select>
                    
                </div>
                <div className="w-full h-fit flex flex-col gap-2">
                    <div className="w-full py-2 flex items-center gap-4">
                        <div className="flex-1 flex gap-1 items-center">
                            <div className="flex-1 h-0 border-y-4 border-emerald-600"></div>
                            <p>Normal</p>
                        </div>
                        <div className="flex-1 flex gap-1 items-center">
                            <div className="flex-1 h-0 border-y-4 border-orange-600"></div>
                            <p>Prbaikn</p>
                        </div>
                        <div className="flex-1 flex gap-1 items-center">
                            <div className="flex-1 h-0 border-y-4 border-red-600"></div>
                            <p>Rusak</p>
                        </div>
                    </div>
                    {isLocRoom && isLocRoom.map((loc: any, id: number) => (
                        <RoomCard key={id} order={id + 1} room={loc.room} Ac={loc.AC} />
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Navigate