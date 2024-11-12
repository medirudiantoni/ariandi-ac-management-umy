import { useRouter } from 'next/router';
import React from 'react';

type AcButton = {
    id: string;
    brand: string;
    condition: boolean;
};

type RoomCardProps = {
    order?: number;
    room?: string;
    Ac?: AcButton[] | null;
};

const RoomCard: React.FC<RoomCardProps> = ({ order, room, Ac }) => {
    const { push } = useRouter();
    return (
        <div className="w-full h-fit border-b-2 flex">
            <div className="p-4">
                <p className="text-slate-500">{order}</p>
            </div>
            <div className="flex-1 py-4">
                <h3 className="text-xl font-bold">Ruang: {room}</h3>
                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                    { Ac && Ac.map((ac, id) => (
                        <button key={id} onClick={() => push(`/detail-ac/${ac.id}`)} className={`col-span-1 py-2 px-4 rounded-xl active:scale-95 duration-75 ${ ac.condition ? "bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-600" : "bg-red-100 hover:bg-red-200 border-2 border-red-600 hidden" }`}>Daikin</button>
                    ))}
                    <button className={`bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-600 hidden`}></button>
                    <button className="bg-red-100 hover:bg-red-200 border-2 border-red-600 hidden"></button>
                </div>
            </div>
        </div>
    )
}

export default RoomCard;