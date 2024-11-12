import Link from 'next/link';
import React from 'react'

type BuildingCardProps = {
    name: string;
    floors: number;
    rooms: number;
    ac_units?: number;
    operating?: number;
    not_operated?: number;
    href?: string;
}

const BuildingCard:React.FC<BuildingCardProps> = ({ name, floors, rooms, ac_units, operating, not_operated, href = '/triversal' }) => {
    return (
        <Link href={href} className="w-full h-fit p-2 rounded-2xl bg-orange-200 cursor-pointer active:scale-95 duration-75 hover:bg-orange-100 group flex gap-2">
            <div className="flex-1 h-full flex flex-col justify-between p-2 pb-1">
                <h3 className="text-2xl font-semibold mb-5">{name}</h3>
                <div>
                    <p>{floors} Lantai</p>
                    <p>{rooms} Ruangan</p>
                </div>
            </div>
            <div className="flex-1 p-3 bg-orange-300 group-hover:bg-orange-200 rounded-xl flex flex-col justify-between">
                <div className='mb-4'>
                    <p>
                        <span className="text-xl">{ac_units} </span>
                        <span className="text-sm">unit Ac</span>
                    </p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p>{operating}</p>
                        <p className='text-xs'>Beroperasi</p>
                    </div>
                    <div>
                        <p>{not_operated}</p>
                        <p className='text-xs'>Rusak</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BuildingCard