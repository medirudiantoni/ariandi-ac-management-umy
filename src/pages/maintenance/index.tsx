import BottomBar from '@/components/elements/bottomBar'
import MaintenanceCard from '@/components/elements/maintenanceCard';
import TopBar from '@/components/elements/topBar'
import MaintenanceData from '@/types/maintenance';
import React, { useEffect, useState } from 'react'

const Maintenance = () => {
    const [isFilter, setIsFilter] = useState<boolean>(true);
    const [isOnGoingMaintenances, setIsOnGoingMaintenances] = useState<MaintenanceData[]>([]);
    const [isDoneMaintenances, setIsDoneMaintenances] = useState<MaintenanceData[]>([]);

    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        const getAllMaintenanceData = async () => {
            try {
                const result = await fetch(`/api/v1/maintenance`).then(res => res.json());
                if (result.data) {
                    setIsOnGoingMaintenances(result.data.filter((data: MaintenanceData) => data.status !== "Selesai"));
                    setIsDoneMaintenances(result.data.filter((data: MaintenanceData) => data.status === "Selesai"))
                }
            } catch (error) {
                console.log(error)
            }
        };
        if (isMounted) {
            getAllMaintenanceData();
            setIsMounted(false);
        }
    }, [isMounted]);

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
                        {isDoneMaintenances && isDoneMaintenances.length > 0 ? isDoneMaintenances.map((data, id) => (
                            <MaintenanceCard key={data.id} id={Number(data.id)} no={id + 1} date={Number(data.start_date)} maintenance_type={data.maintenance_type} status={data.status} />
                        )) : (
                            <div className="w-full h-fit bg-slate-100 py-10 text-center">
                                <p className="text-slate-500 italic">No data</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-fit flex flex-col gap-2">
                        {isOnGoingMaintenances && isOnGoingMaintenances.length > 0 ? isOnGoingMaintenances.map((data, id) => (
                            <MaintenanceCard key={data.id} id={Number(data.id)} no={id + 1} date={Number(data.start_date)} maintenance_type={data.maintenance_type} status={data.status} />
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