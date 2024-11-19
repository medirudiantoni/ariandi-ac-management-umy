import { Info, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type InputData = {
    cost: number | undefined,
    repair_details: string,
    replacement_details: string
};

type ModalMaintenanceIsDoneProps = {
    acId: string;
    id: string;
    onClose: () => void;
    onSetInitialMount: () => void;
}

const ModalDoneMaintenance: React.FC<ModalMaintenanceIsDoneProps> = ({ acId, id, onClose, onSetInitialMount }) => {
    const maintenance_type_list = ["Pembersihan", "Penggantian", "Perbaikan"];
    const [isInputData, setIsInputData] = useState<InputData>({
        cost: undefined,
        repair_details: "",
        replacement_details: ""
    });
    const [isDone, setIsDone] = useState({
        isMaintenance: false,
        isAc: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const timestamp = new Date().getTime();
        const data = {
            end_date: String(timestamp),
            cost: isInputData.cost,
            repair_details: isInputData.repair_details,
            replacement_details: isInputData.replacement_details
        };
        console.log(data)
        const dataAc = {
            condition: true,
            status: "Normal"
        }
        const setMaintenanceIsDONE = async() => {
            try {
                const response = await fetch(`/api/v1/maintenance/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                setIsInputData({
                    cost: 0,
                    repair_details: "",
                    replacement_details: ""
                });
                setIsDone({...isDone, isMaintenance: true});
                if(response.ok){
                    return true
                }
            } catch (error) {
                console.log(error);
                toast.error("Laporan hasil perawatan gagal dikirim");
            }
        }
        const setStatusAC = async () => {
            setMaintenanceIsDONE()
            try {
                const response = await fetch(`/api/v1/ac/${acId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataAc)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                setIsDone({...isDone, isAc: true});
                toast.success("Laporan hasil perawatan sukses dikirim");
                onSetInitialMount();
                onClose();
                console.log('iyaa')
            } catch (error) {
                console.log("gagal", error);
            }
        }
        setStatusAC();
    }

    return (
        <div className="fixed z-50 top-0 bottom-0 w-full max-w-sm mx-auto flex items-end justify-stretch">
            <div className="w-full h-full absolute top-0 left-0 bg-black/20"></div>
            <div className="w-full h-[90%] relative z-10 rounded-t-2xl bg-white p-2 pb-20">
                <div className="w-full mb-0 relative flex items-center justify-end">
                    <button onClick={onClose} className="w-10 aspect-square rounded-xl bg-slate-200 hover:bg-slate-300 active:bg-slate-400 active:scale-95 duration-75 flex items-center justify-center">
                        <X />
                    </button>
                </div>
                <div className="w-full h-full px-8">
                    <form onSubmit={handleSubmit} className='w-full h-full flex flex-col'>
                        <div className="w-full flex-1">

                            <h3 className="text-xl font-semibold mb-2 pb-1 border-b-2">Edit pemeliharaan</h3>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="cost">Biaya:</label>
                                <input value={isInputData.cost || undefined} onChange={(e) => setIsInputData({ ...isInputData, cost: Number(e.target.value) })} type="number" id="cost" className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="repair_details">Detail perawatan:</label>
                                <textarea value={isInputData.repair_details} onChange={(e) => setIsInputData({ ...isInputData, repair_details: e.target.value })} className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="replacement_details">Penggantian spare-part:</label>
                                <textarea value={isInputData.replacement_details} onChange={(e) => setIsInputData({ ...isInputData, replacement_details: e.target.value })} className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                        </div>
                        <button type='submit' className='w-full py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 duration-75'>Kirim laporan dan selesai</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalDoneMaintenance