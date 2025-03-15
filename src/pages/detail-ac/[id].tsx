import MaintenanceCard from '@/components/elements/maintenanceCard';
import ModalNewMaintenance from '@/components/elements/newMaintenance';
import DetailAcSkeleton from '@/components/elements/skeletons/detailAcSkeleton';
import TopBar from '@/components/elements/topBar';
import { hasAccess2 } from '@/lib/access';
// import AcDataType from '@/types/acData';
import MaintenanceData from '@/types/maintenance';
import { TimerIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

const DetailAc = () => {
    const { query } = useRouter();
    const { data } = useSession();

    // SWR untuk AC Data
    const { data: acData, error: acError } = useSWR(
        query.id ? `/api/v1/ac/${query.id}` : null
    );

    // SWR untuk Maintenance Data
    const { data: maintenanceData, error: maintenanceError } = useSWR(
        query.id ? `/api/v1/maintenance/s/${query.id}` : null
    );

    const [isMaintenance, setIsMaintenance] = useState(false);

    const handleSetMaintenance = () => {
        if (acData && acData.data.status.includes("Sedang")) {
            setIsMaintenance(false);
            toast.error(
                "Tidak bisa menambah pemeliharaan baru selama masa pemeliharaan SEDANG berlangsung"
            );
        } else {
            setIsMaintenance(true);
        }
    };

    if (acError || maintenanceError) {
        return <div>Error loading data</div>;
    }

    if (!acData || !maintenanceData) {
        return <DetailAcSkeleton />;
    }

    const isAc = acData.data;
    const isMaintenanceInfo = maintenanceData.data;

    return (
        <div className=" w-full h-full bg-slate-50 relative pt-16">
            <TopBar backButton={true} title="Daikin E6 307" search={false} />
            <div className="w-full h-full p-5">
                <div className="w-full h-fit p-4 bg-blue-100 rounded-2xl mb-2">
                    <table className="w-full table-auto">
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
                                {/* <td>{isAc && isAc.loc.building} {isAc && isAc.loc.floor} {isAc && isAc.loc.room}</td> */}
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
                                    {isAc && isAc.condition ? (
                                        <p className="text-green-600">Baik/Normal</p>
                                    ) : (
                                        <p className="text-red-600">Tidak beroperasi</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>:</td>
                                <td>
                                    {isAc && isAc.status !== "Normal" ? (
                                        <p className="text-orange-500">{isAc && isAc.status}</p>
                                    ) : (
                                        <p className="text-blue-600">{isAc && isAc.status}</p>
                                    )}
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
                {isAc && isAc.status.includes("Sedang") ? (
                    <button
                        disabled
                        className="w-full py-3 px-4 rounded-2xl bg-blue-300 text-white cursor-not-allowed"
                    >
                        Pemeliharaan baru
                    </button>
                ) : hasAccess2.includes(data?.user.role as string) && (
                    <button
                        onClick={handleSetMaintenance}
                        className="w-full py-3 px-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-75"
                    >
                        Pemeliharaan baru
                    </button>
                )}
                <div className="my-4 pt-4 border-t-2">
                    <div className="flex items-start gap-1.5">
                        <TimerIcon />
                        <h3 className="text-lg font-medium">Riwayat Pemeliharaan:</h3>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    {isMaintenanceInfo && isMaintenanceInfo.length > 0 ? (
                        isMaintenanceInfo.map((info: MaintenanceData, id: number) => (
                            <MaintenanceCard
                                key={id}
                                id={Number(info.id)}
                                no={id + 1}
                                date={Number(info.start_date)}
                                maintenance_type={info.maintenance_type}
                                status={info.status}
                            />
                        ))
                    ) : (
                        <div className="w-full h-fit px-4 py-8 text-center bg-slate-200 text-slate-600 rounded-2xl">
                            Belum ada pemeliharaan
                        </div>
                    )}
                </div>
            </div>

            {isMaintenance && hasAccess2.includes(data?.user.role as string) && (
                <ModalNewMaintenance id={String(query.id)} onClose={() => setIsMaintenance(false)} />
            )}
        </div>
    );
};

export default DetailAc;