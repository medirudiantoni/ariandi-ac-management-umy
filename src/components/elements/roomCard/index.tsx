import AcDataType from '@/types/acData';
import { useRouter } from 'next/router';
import React from 'react';

type RoomCardProps = {
    order?: number;
    room?: string;
    AC?: AcDataType[];
};

const RoomCard: React.FC<RoomCardProps> = ({ order, room, AC }) => {
    const { push } = useRouter();
    return (
        <div className="w-full h-fit border-b-2 flex">
            <div className="p-4">
                <p className="text-slate-500">{order}</p>
            </div>
            <div className="flex-1 py-4">
                <h3 className="text-xl font-bold">Ruang: {room}</h3>
                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                    {AC && AC.map((ac, id) => (
                        <button key={id} onClick={() => push(`/detail-ac/${ac.id}`)} className={`py-2 px-4 rounded-xl border-2 active:scale-95 duration-75 ${ac.condition ? "bg-emerald-100 hover:bg-emerald-200 border-emerald-600" : ac.status == "Belum diperbaiki" ? "bg-red-100 hover:bg-red-200 border-red-600" : "bg-orange-100 hover:bg-orange-200 border-orange-600"}`}>{ac.brand}</button>
                    ))}
                    <button className={`bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-600 hidden`}></button>
                    <button className="bg-red-100 hover:bg-red-200 border-2 border-red-600 hidden"></button>
                </div>
            </div>
        </div>
    )
}

export default RoomCard;