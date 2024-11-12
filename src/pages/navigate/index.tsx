import AcCard from '@/components/elements/acCard';
import TopBar from '@/components/elements/topBar'
import React, { useState } from 'react'

type OptionType = {
    name: string;
    value: number
}

const Navigate = () => {
    const [isSelectedFloor, setIsSelectedFloor] = useState('')
    const [isSelectedRoom, setIsSelectedRoom] = useState('')
    const opsiLantai = [
        'Lantai 1',
        'Lantai 2',
        'Lantai 3',
        'Lantai 4',
    ];
    const opsiRuangan = [
        'Ruangan 1',
        'Ruangan 2',
        'Ruangan 3',
        'Ruangan 4',
        'Ruangan 5',
        'Ruangan 6',
    ];

    return (
        <div className="w-full h-full bg-slate-50 pt-16">
            <TopBar backButton={true} title='AR Fachrudin' search={true} />
            <div className="w-full h-full p-5 mb-5">
                <div className="w-full h-fit p-4 rounded-2xl bg-blue-100">
                    <div className="flex justify-between">
                        <p>5 Lantai</p>
                        <p>50 Ruangan</p>
                    </div>
                </div>
                <div className="w-full h-fit p-4 rounded-2xl bg-blue-200">
                    <div className="w-full flex gap-2 pb-2 justify-center border-b">
                        <p>Total Ac</p>
                        <p>
                            <span className="text-2xl font-semibold">100 </span>
                            <span className="text-sm">unit</span>
                        </p>
                    </div>
                    <div className="w-full flex gap-2 justify-between pt-2">
                        <p>80 unit normal</p>
                        <p>20 unit rusak</p>
                    </div>
                </div>
                <div className="w-full h-fit flex gap-2 py-4">
                    <select onChange={e => setIsSelectedFloor(e.target.value)} name="lantai" id="lantai" className='py-2 px-4 flex-1 border-2 rounded-xl'>
                        <option value="">Pilih Lantai</option>
                        {opsiLantai.map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                    <select onChange={e => setIsSelectedRoom(e.target.value)} name="lantai" id="lantai" className={`py-2 px-4 flex-1 border-2 rounded-xl`}>
                        <option value="">Pilih Ruangan</option>
                        {opsiRuangan.map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full h-fit flex flex-col gap-2">
                    <AcCard brand='Daikin' location='E6 307' status={false} isMaintaining={true} />
                    <AcCard brand='Daikin' location='E6 307' status={true} isMaintaining={false} lastMaintenance='25 Mei 2024' />
                </div>
            </div>
        </div>
    )
}

export default Navigate