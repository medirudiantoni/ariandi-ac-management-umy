import MaintenanceCard from '@/components/elements/maintenanceCard'
import ModalNewMaintenance from '@/components/elements/newMaintenance'
import TopBar from '@/components/elements/topBar'
import { TimerIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DetailAc = () => {
    const { query } = useRouter();

    const [isAc, setIsAc] = useState<any>({});
    const [isMaintenanceInfo, setIsMaintenanceInfo] = useState([]);
    const [isMaintenance, setIsMaintenance] = useState(false);

    useEffect(() => {
        const getAc = async (id: string) => {
            try {
                const result = await fetch(`/api/v1/ac/${id}`).then(res => res.json());
                setIsAc(result.data);
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        };
        const getMaintenanceData = async (id: string) => {
            try {
                const result = await fetch(`/api/v1/maintenance/${id}`).then(res => res.json());
                setIsMaintenanceInfo(result.data);
            } catch (error) {
                console.log(error)
            }
        };
        getMaintenanceData(String(query.id));
        getAc(String(query.id));
    }, []);

    return (
        <div className="w-full h-full bg-slate-50 relative pt-16">
            <TopBar backButton={true} title='Daikin E6 307' search={false} />
            <div className="w-full h-full p-5">
                <div className="w-full h-fit p-4 bg-blue-100 rounded-2xl mb-2">
                    <table className='w-full table-auto'>
                        <tbody>

                            <tr>
                                <td>Merk</td>
                                <td>:</td>
                                <td>{isAc && isAc.brand}</td>
                            </tr>
                            <tr>
                                <td>Tipe</td>
                                <td>:</td>
                                <td>{isAc && isAc.type}</td>
                            </tr>
                            <tr>
                                <td>PK</td>
                                <td>:</td>
                                <td>{isAc && isAc.PK}</td>
                            </tr>
                            <tr>
                                <td>Lokasi</td>
                                <td>:</td>
                                {/* <td>{isAc && isAc.loc.building} {isAc && isAc.loc.floor}0{isAc && isAc.loc.room}</td> */}
                            </tr>
                            <tr>
                                <td>Pemasangan</td>
                                <td>:</td>
                                <td>{isAc && isAc.installed_at}</td>
                            </tr>
                            <tr>
                                <td>Kondisi</td>
                                <td>:</td>
                                <td>
                                    {/* <p className="text-green-600">Baik/Normal</p> */}
                                    {isAc ? (isAc.condition ?
                                        (<p className="text-green-600">Baik/Normal</p>) :
                                        (<p className="text-red-600">Rusak</p>)) : null}
                                </td>
                            </tr>
                            <tr>
                                <td>Perawatan terakhir</td>
                                <td>:</td>
                                <td>20 Okt 2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={() => setIsMaintenance(true)} className='w-full py-3 px-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-75'>Pemeliharaan baru</button>
                <div className="my-4 pt-4 border-t-2">
                    <div className="flex items-start gap-1.5">
                        <TimerIcon />
                        <h3 className="text-lg font-medium">Riwayat Pemeliharaan:</h3>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    {isMaintenanceInfo ? isMaintenanceInfo.map((info: any, id: number) => (
                        <MaintenanceCard />
                    )) : (
                        <div className="w-full h-fit px-4 py-8 text-center bg-slate-200 text-slate-600 rounded-2xl">Belum ada pemeliharaan</div>
                    )}
                </div>
            </div>

            {isMaintenance && (
                <ModalNewMaintenance id={String(query.id)} onClose={() => setIsMaintenance(false)} />
            )}


        </div>
    )
}

// { acId, start_date, technician, koordinator, description, maintenance_type }
export default DetailAc