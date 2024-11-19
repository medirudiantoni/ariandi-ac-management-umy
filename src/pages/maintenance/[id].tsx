import ModalDoneMaintenance from '@/components/elements/doneMaintenance'
import ModalEditMaintenance from '@/components/elements/editMaintenance'
import TopBar from '@/components/elements/topBar'
import formatDateTime from '@/lib/timeFormat'
import { Edit3 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useRouter as useRouterNav } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LocType from '@/types/locData'
import MaintenanceData from '@/types/maintenance'

const MaintenancePage = () => {
    const { query } = useRouter();
    const { back } = useRouterNav();
    const [isDataResponse, setIsDataResponse] = useState<MaintenanceData>({
        id: 0,
        acId: 0,
        AC: {
            id: 0,
            unit_code: '',
            brand: '',
            type: '',
            PK: '',
            condition: false,
            is_broken: false,
            status: '',
            loc_id: 0,
            loc: {
                id: 0,
                alias: "",
                name: "",
                building: "",
                floor: "",
                room: "",
                fakultas: "",
                prodi: "",
            },
            installed_at: '',
        },
        coordinator: '',
        cost: 0,
        description: '',
        end_date: '',
        maintenance_type: '',
        repair_details: '',
        replacement_details: '',
        start_date: '',
        status: '',
        technician: '',
    });
    const [isLoc, setIsLoc] = useState<LocType>({
        id: 0,
        alias: "",
        name: "",
        building: "",
        floor: "",
        room: "",
        fakultas: "",
        prodi: "",
    });
    const [locToDisplay, setLocToDisplay] = useState("");
    const [isEditMaintenance, setIsEditMaintenance] = useState(false);
    const [isDoneMaintenance, setIsDoneMaintenance] = useState(false);
    const [initialMount, setInitialMount] = useState(true);

    useEffect(() => {
        const getMaintenanceData = async (id: number) => {
            try {
                const result = await fetch(`/api/v1/maintenance/${id}`).then(res => res.json());
                setIsDataResponse(result.data);
                setIsLoc(result.data.AC.loc);
            } catch (error) {
                console.log(error)
            }
        };
        if (query.id && initialMount) {
            getMaintenanceData(Number(query.id));
            setInitialMount(false);
        }
    }, [initialMount, query]);

    useEffect(() => {

        if (isLoc) {
            const result = `${isLoc.building} ${isLoc.floor}${String(isLoc.room).length <= 10 ? "0" + isLoc.room : isLoc.room}`
            setLocToDisplay(result);
        };
    }, [isLoc, isDataResponse]);

    return (
        <div className=" w-full h-full bg-slate-50 relative pt-20">
            <TopBar title='Detail' search={false} backButton={true} />
            <div className="w-full h-full p-5 pt-0 flex flex-col gap-2">
                <div className="w-full flex-1">
                    <h1 className="text-xl font-semibold mb-2 pb-1 border-b">{isDataResponse && isDataResponse.maintenance_type}</h1>
                    <table className='w-full table-auto'>
                        <tbody>

                            <tr>
                                <td className='text-slate-600'>AC</td>
                                <td>:</td>
                                <td>{isDataResponse && isDataResponse.AC && isDataResponse.AC.brand}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Kode unit</td>
                                <td>:</td>
                                <td>{isDataResponse && isDataResponse.AC && isDataResponse.AC.unit_code}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Lokasi</td>
                                <td>:</td>
                                <td>{locToDisplay && locToDisplay}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Koordinator</td>
                                <td>:</td>
                                <td>{isDataResponse && isDataResponse.coordinator}</td>
                            </tr>
                            <tr>
                                <td className='text-slate-600'>Teknisi</td>
                                <td>:</td>
                                <td>{isDataResponse && isDataResponse.technician}</td>
                            </tr>
                            <tr>
                                <td className=' text-slate-600 flex items-start'>Mulai</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    {isDataResponse && isDataResponse.start_date && formatDateTime(Number(isDataResponse.start_date))}
                                </td>
                            </tr>
                            {isDataResponse && isDataResponse.end_date && (
                                <tr>
                                    <td className=' text-slate-600 flex items-start'>Selesai</td>
                                    <td className='relative'><p className='absolute top-0'>:</p></td>
                                    <td>
                                        {isDataResponse && isDataResponse.end_date}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className=' text-slate-600 flex items-start'>Status</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    <p className="text-blue-600">{isDataResponse && isDataResponse.status}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-slate-600 flex items-start'>Deskripsi</td>
                                <td className='relative'><p className='absolute top-0'>:</p></td>
                                <td>
                                    {isDataResponse && isDataResponse.description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {isDataResponse && isDataResponse.status !== "Selesai" ? (
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
            {isDataResponse && isEditMaintenance && <ModalEditMaintenance acId={String(isDataResponse.acId)} id={String(isDataResponse.id)} onClose={() => setIsEditMaintenance(false)} onSetInitialMount={() => setInitialMount(true)} />}
            {isDataResponse && isDoneMaintenance && <ModalDoneMaintenance acId={String(isDataResponse.acId)} id={String(isDataResponse.id)} onClose={() => setIsDoneMaintenance(false)} onSetInitialMount={() => setInitialMount(true)} />}
        </div>
    )
}

export default MaintenancePage;