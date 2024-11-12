import Link from 'next/link';
import React from 'react'

type AcCardProps = {
    brand: string;
    location: string;
    status: boolean;
    isMaintaining: boolean;
    lastMaintenance?: string;
    href?: string;
}

const AcCard: React.FC<AcCardProps> = ({ brand, location, status, isMaintaining, lastMaintenance, href = 'detail-ac' }) => {
    return (
        <Link href={href} className='w-full h-fit p-4 hover:bg-blue-50 hover:ring-2 ring-blue-600 active:scale-95 duration-100 bg-blue-100 rounded-2xl'>
            <div className="flex justify-between items-end pb-2 border-b">
                <h3 className='text-2xl font-semibold'>{brand}</h3>
                <p className='text-xl font-medium'>{location}</p>
            </div>
            <div className="w-full pt-2 flex items-center gap-2 justify-between">
                {status ? (
                    <div className="py-1.5 px-5 h-fit w-fit rounded-full bg-green-500 text-white">
                        <p>Normal</p>
                    </div>
                ) : (
                    <div className="py-1.5 px-5 h-fit w-fit rounded-full bg-red-500 text-white">
                        <p>Rusak</p>
                    </div>
                )}
                {isMaintaining ? (
                    <p className='text-blue-700'>Sedang diperbaiki</p>
                ) : (
                    <p>{lastMaintenance}</p>
                )}
            </div>
        </Link>
    )
}

export default AcCard