import BottomBar from '@/components/elements/bottomBar'
import MaintenanceCard2 from '@/components/elements/maintenanceCard2';
import MaintenancesSkeleton from '@/components/elements/skeletons/maintenacesSkeleton';
import TopBar from '@/components/elements/topBar'
import MaintenanceData from '@/types/maintenance';
import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Maintenance = () => {
    const [isFilter, setIsFilter] = useState<boolean>(true);

    const { data: maintenanceData } = useSWR(`/api/v1/maintenance`, fetcher);

    const isDoneMaintenances: MaintenanceData[] = maintenanceData?.data
        ? maintenanceData.data.filter((data: MaintenanceData) => data.status === "Selesai")
        : [];

    const isOnGoingMaintenances: MaintenanceData[] = maintenanceData?.data
        ? maintenanceData.data.filter((data: MaintenanceData) => data.status !== "Selesai")
        : [];

    if(!maintenanceData){
        return <MaintenancesSkeleton />
    }

    return (
        <div className='w-full min-h-full bg-slate-50 relative pt-20 pb-16'>
            <TopBar title='Linimasa' backButton={true} />
            <div className="w-full min-h-full py-5 px-8">
                <h1 className="text-xl font-bold mb-2">Pemeliharaan Ac</h1>
                <div className="w-full flex items-center gap-1 mb-4">
                    <button onClick={() => setIsFilter(true)} className={`flex-1 py-2 px-4 rounded-t-xl ${isFilter ? 'bg-blue-600 text-white' : ' bg-slate-200'}`}>Selesai</button>
                    <button onClick={() => setIsFilter(false)} className={`flex-1 py-2 px-4 rounded-t-xl ${!isFilter ? 'bg-blue-600 text-white' : ' bg-slate-200'}`}>Sedang..</button>
                </div>
                {isFilter ? (
                    <div className="w-full h-fit flex flex-col gap-2">
                        {isDoneMaintenances.length > 0 ? isDoneMaintenances.map((data, id) => (
                            <MaintenanceCard2 key={data.id} id={Number(data.id)} no={id + 1} date={Number(data.start_date)} maintenance_type={data.maintenance_type} location={data.AC.loc.alias} />
                        )) : (
                            <div className="w-full h-fit bg-slate-100 py-10 text-center">
                                <p className="text-slate-500 italic">No data</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-fit flex flex-col gap-2">
                        {isOnGoingMaintenances.length > 0 ? isOnGoingMaintenances.map((data, id) => (
                            <MaintenanceCard2 key={data.id} id={Number(data.id)} no={id + 1} date={Number(data.start_date)} maintenance_type={data.maintenance_type} location={data.AC.loc.alias} />
                        )) : (
                            <div className="w-full h-fit bg-slate-100 py-10 text-center">
                                <p className="text-slate-500 italic">No data</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <BottomBar />
        </div>
    )
}

export default Maintenance