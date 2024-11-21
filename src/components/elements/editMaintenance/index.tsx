import { Info, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type InputData = {
    technician: string;
    description: string;
    maintenance_type: string;
    coordinator: string;
};

type ModalNewMaintenanceProps = {
    acId: string;
    id: string;
    onClose: () => void;
    onSetInitialMount?: () => void;
}

const ModalEditMaintenance: React.FC<ModalNewMaintenanceProps> = ({ id, onClose, onSetInitialMount }) => {
    const maintenance_type_list = ["Pembersihan", "Penggantian", "Perbaikan"];
    const [isInputData, setIsInputData] = useState<InputData>({
        technician: "",
        description: "",
        maintenance_type: "",
        coordinator: ""
    });

    useEffect(() => {
        const getMaintenanceData = async () => {
            try {
                const result = await fetch(`/api/v1/maintenance/${id}`).then(res => res.json());
                console.log(result)
                setIsInputData({
                    technician: result.data.technician,
                    description: result.data.description,
                    maintenance_type: result.data.maintenance_type,
                    coordinator: result.data.coordinator,
                });
            } catch (error) {
                console.log('failed: ', error);
            }
        }

        getMaintenanceData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: Number(id),
            technician: isInputData.technician,
            description: isInputData.description,
            maintenance_type: isInputData.maintenance_type,
            coordinator: isInputData.coordinator
        };
        try {
            const response = await fetch(`/api/v1/maintenance/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            toast.custom(<div className='py-2 px-4 rounded-full flex items-center gap-2 bg-blue-200'>
                <Info />
                <p>Pemeliharaan berhasil diedit</p>
            </div>);
            setIsInputData({
                technician: "",
                description: "",
                maintenance_type: "",
                coordinator: ""
            });
            if(onSetInitialMount){
                onSetInitialMount();
            }
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Data pemeliharaan gagal diedit");
        }
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
                                <label htmlFor="technician">Teknisi:</label>
                                <input value={isInputData.technician} onChange={(e) => setIsInputData({ ...isInputData, technician: e.target.value })} type="text" id="technician" className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="coordinator">Koordinator:</label>
                                <input value={isInputData.coordinator} onChange={(e) => setIsInputData({ ...isInputData, coordinator: e.target.value })} type="text" id="coordinator" className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="start_date">Deskripsi:</label>
                                <textarea value={isInputData.description} onChange={(e) => setIsInputData({ ...isInputData, description: e.target.value })} className='py-2 px-4 rounded-xl bg-slate-200' />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <select value={isInputData.maintenance_type} onChange={e => setIsInputData({ ...isInputData, maintenance_type: e.target.value })} name="lantai" id="lantai" className='py-2 px-4 flex-1 border-2 rounded-xl'>
                                    <option value="">Tipe pemeliharaan</option>
                                    {maintenance_type_list.map((type: string, id: number) => (
                                        <option key={id} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='w-full py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 duration-75'>Edit pemeliharaan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalEditMaintenance