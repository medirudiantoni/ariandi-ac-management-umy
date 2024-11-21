import ModalDoneMaintenance from '@/components/elements/doneMaintenance'
import ModalEditMaintenance from '@/components/elements/editMaintenance'
import TopBar from '@/components/elements/topBar'
import formatDateTime from '@/lib/timeFormat'
import { Edit3 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useRouter as useRouterNav } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr'
// import LocType from '@/types/locData'
// import MaintenanceData from '@/types/maintenance'
import { fetcher } from '@/utils/fetcher'
import MaintenanceSkeleton from '@/components/elements/skeletons/maintenanceSkel'

// const fetcher = (url: string) => fetch(url).then(res => res.json());

const MaintenancePage = () => {
    const { query } = useRouter();
    const { back } = useRouterNav();
    const [isEditMaintenance, setIsEditMaintenance] = useState(false);
    const [isDoneMaintenance, setIsDoneMaintenance] = useState(false);

    const { data: maintenanceData, mutate } = useSWR(
        query.id ? `/api/v1/maintenance/${query.id}` : null,
        fetcher
    );

    const locToDisplay = maintenanceData
        ? `${maintenanceData.data.AC.loc.building} ${maintenanceData.data.AC.loc.floor}${String(maintenanceData.data.AC.loc.room).length <= 10 ? "0" + maintenanceData.data.AC.loc.room : maintenanceData.data.AC.loc.room}`
        : '';

    if (!maintenanceData) {
        return <MaintenanceSkeleton />
    }

    return (
        <div className="w-full h-full bg-slate-50 relative pt-20">
            <TopBar title='Detail' search={false} backButton={true} />
            <div className="w-full h-full p-5 pt-0 flex flex-col gap-2">
                <div className="w-full flex-1">
                    <h1 className="text-xl font-semibold mb-2 pb-1 border-b">
                        {maintenanceData && maintenanceData.data.maintenance_type}
                    </h1>
                    <table className='w-full table-auto'>
                        <tbody>
                            <tr>
                                <td className='text-slate-600'>AC</td>
                                <td>:</td>
                                <td>{maintenanceData && maintenanceData.data.AC.brand}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Kode unit</td>
                                <td>:</td>
                                <td>{maintenanceData && maintenanceData.data.AC.unit_code}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Lokasi</td>
                                <td>:</td>
                                <td>{locToDisplay}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Koordinator</td>
                                <td>:</td>
                                <td>{maintenanceData && maintenanceData.data.coordinator}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Teknisi</td>
                                <td>:</td>
                                <td>{maintenanceData && maintenanceData.data.technician}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600 flex items-start'>Mulai</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    {maintenanceData && maintenanceData.data.start_date &&
                                        formatDateTime(Number(maintenanceData.data.start_date))}
                                </td>
                            </tr>
                            {maintenanceData && maintenanceData.data.end_date && (
                                <tr>
                                    <td className='text-slate-600 flex items-start'>Selesai</td>
                                    <td className='relative'><p className='absolute top-0'>:</p></td>
                                    <td>
                                        {maintenanceData.data.end_date}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className='text-slate-600 flex items-start'>Status</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    <p className="text-blue-600">{maintenanceData && maintenanceData.data.status}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-slate-600 flex items-start'>Deskripsi</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    {maintenanceData && maintenanceData.data.description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {maintenanceData && maintenanceData.data.status !== "Selesai" ? (
                    <div className="w-full flex items-center gap-2">
                        <button onClick={() => setIsEditMaintenance(true)} className='py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 duration-75 text-white'><Edit3 /></button>
                        <button onClick={() => setIsDoneMaintenance(true)} className='flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 duration-75 text-white'>Selesai</button>
                    </div>
                ) : (
                    <div className="w-full">
                        <button onClick={() => back()} className='w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 duration-75 text-white'>Kembali</button>
                    </div>
                )}
            </div>
            {maintenanceData && isEditMaintenance && (
                <ModalEditMaintenance
                    acId={String(maintenanceData.data.acId)}
                    id={String(maintenanceData.data.id)}
                    onClose={() => setIsEditMaintenance(false)}
                    onSetInitialMount={() => mutate()}
                />
            )}
            {maintenanceData && isDoneMaintenance && (
                <ModalDoneMaintenance
                    acId={String(maintenanceData.data.acId)}
                    id={String(maintenanceData.data.id)}
                    onClose={() => setIsDoneMaintenance(false)}
                    onSetInitialMount={() => mutate()}
                />
            )}
        </div>
    )
}

export default MaintenancePage;