import TopBar from '@/components/elements/topBar'
import LocType from '@/types/locData';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr'
import Swal from 'sweetalert2';
import { useLocations } from '@/lib/zustand';
import transformData, { calculateFloorData } from '@/lib/transformDataLoc';
import TriversalLocType, { FloorData } from '@/types/teriversal';
import { fetcher } from '@/utils/fetcher';
import Spin from '@/components/elements/spinSVG';

// Centralized fetcher function
// const fetcher = (url: string) => fetch(url).then(res => res.json());

const NewAc = () => {
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isLoc, setIsLoc] = useState<LocType[]>([]);
    const [isBuildings, setIsBuildings] = useState<TriversalLocType[]>([]);
    const [isFloors, setIsFloors] = useState<FloorData[]>([]);
    const [isRooms, setIsRooms] = useState<LocType[]>([]);
    const [isLoadingSubmition, setIsLoadingSubmition] = useState<boolean>(false);

    const [buildingSelected, setBuildingSelected] = useState("");
    const [floorSelected, setFloorSelected] = useState("");

    const locationsData = useLocations(state => state.locationsData);

    const { data: locData } = useSWR('/api/v1/location', fetcher);

    useEffect(() => {
        if (locationsData.length >= 1) {
            setIsLoc(locationsData);
        } else {
            setIsLoc(locData?.data);
        }
    });

    useEffect(() => {
        if (isLoc) {
            setIsBuildings(transformData(isLoc))
        };
    }, [isLoc]);

    useEffect(() => {
        if (buildingSelected.length >= 1) {
            setIsFloors(calculateFloorData(isLoc).filter(item => item.building == buildingSelected))
        }
    }, [buildingSelected]);

    useEffect(() => {
        if (floorSelected.length >= 1) {
            setIsRooms(isLoc.filter(item => item.building == buildingSelected && item.floor == floorSelected));
        }
    }, [floorSelected]);

    const [isInputLoc, setIsInputLoc] = useState({
        building: "",
        floor: "",
        room: "",
        id: "",
    });

    const [isInputData, setIsInputData] = useState({
        unit_code: "",
        brand: "",
        type: "",
        PK: "",
        condition: true,
        loc_id: 0,
        installed_at: ""
    });

    const handleSubmitForm = async () => {
        setIsLoadingSubmition(true);
        try {
            const response = await fetch(`/api/v1/ac`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isInputData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const result = await response.json();
            console.log("Data berhasil dikirim:", result);
            setIsInputData({
                unit_code: "",
                brand: "",
                type: "",
                PK: "",
                condition: true,
                loc_id: 0,
                installed_at: ""
            });
            setIsInputLoc({
                building: "",
                floor: "",
                room: "",
                id: "",
            })
            setIsConfirm(false)
            // toast.success('Menambah data Ac baru Sukses!');
            Swal.fire({
                title: 'Sukses!',
                text: 'Berhasil menambah data AC baru',
                icon: 'success',
            });
            setIsLoadingSubmition(false)
        } catch (error) {
            console.log(`Error saat mengirim data: ${error}`);
            toast.custom(<div className='text-red-600 py-2 px-4 rounded-full bg-white flex items-center gap-2'><X /> <p>Kode unit sudah digunakan</p></div>)
            setIsConfirm(false)
            setIsLoadingSubmition(false)
        }
    };

    const handleBuildingChange = (building: string) => {
        setBuildingSelected(building);
        setIsInputLoc({
            ...isInputLoc,
            building: building,
            floor: "",
            room: "",
            id: ""
        });
    };

    const handleFloorChange = (floor: string) => {
        setFloorSelected(floor);
        setIsInputLoc({
            ...isInputLoc,
            floor: floor,
            room: "",
            id: ""
        });
    };

    const handleSelectRoomChange = (id: number) => {
        const selectedData = isRooms.find((room) => room.id == Number(id));
        if (selectedData) {
            setIsInputLoc({
                ...isInputLoc,
                room: selectedData.room,
                id: String(selectedData.id)
            });
            setIsInputData({ ...isInputData, loc_id: selectedData.id });
        }
    };

    return (
        <div className='w-full h-full bg-slate-50 relative pt-16'>
            <TopBar backButton={true} search={false} title='New AC' />
            <div className="w-full h-full flex flex-col gap-8 p-5">
                <form className="w-full flex-1 flex flex-col gap-2">
                    <div className="flex-1 w-full flex flex-col gap-2.5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="unit_code">Kode Unit:</label>
                            <input
                                onChange={(e) => setIsInputData({ ...isInputData, unit_code: e.target.value })}
                                value={isInputData.unit_code}
                                type="text"
                                id='unit_code'
                                placeholder='Kode unit Ac'
                                className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="brand">Merk:</label>
                            <input
                                onChange={(e) => setIsInputData({ ...isInputData, brand: e.target.value })}
                                value={isInputData.brand}
                                type="text"
                                id='brand'
                                placeholder='Merk Ac baru'
                                className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="brand-type">Tipe:</label>
                            <input
                                onChange={(e) => setIsInputData({ ...isInputData, type: e.target.value })}
                                value={isInputData.type}
                                type="text"
                                id='brand-type'
                                placeholder='Tipe merk Ac'
                                className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="brand-pk">PK:</label>
                            <input
                                onChange={(e) => setIsInputData({ ...isInputData, PK: e.target.value })}
                                value={isInputData.PK}
                                type="text"
                                id='brand-pk'
                                placeholder='PK Ac'
                                className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required
                            />
                        </div>
                        <label>
                            <p className='mb-2'>Lokasi:</p>
                            <div className="pl-8 flex flex-col gap-2">
                                <select
                                    onChange={e => handleBuildingChange(e.target.value)}
                                    value={isInputLoc.building}
                                    id='select-building'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Gedung</option>
                                    {isBuildings && isBuildings.map((item, id: number) => (
                                        <option key={id} value={item.building}>{item.building}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={e => handleFloorChange(e.target.value)}
                                    value={isInputLoc.floor}
                                    id='select-floor'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Lantai</option>
                                    {isFloors && isFloors.map((item, id: number) => (
                                        <option key={id} value={item.floor}>Lantai {item.floor}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={(e) => handleSelectRoomChange(Number(e.target.value))}
                                    value={isInputLoc.id}
                                    id='select-room'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Ruangan</option>
                                    {isRooms && isRooms.map((data, id: number) => (
                                        <option key={id} value={data.id}>{data.room}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-4 pb-2 pl-8 border-b-2 flex items-center gap-1.5">
                                <p>
                                    <span>Set: </span>
                                    <span>Gedung {isInputLoc.building}</span>
                                    <span>{">"} Lantai {isInputLoc.floor}</span>
                                    <span>{">"} Ruang {isInputLoc.room}</span>
                                </p>
                            </div>
                        </label>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="installed_at">Tanggal pemasangan:</label>
                            <input
                                onChange={(e) => setIsInputData({ ...isInputData, installed_at: e.target.value })}
                                value={isInputData.installed_at}
                                type="date"
                                id='installed_at'
                                placeholder='Tanggal Intalasi Ac'
                                className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required
                            />
                        </div>
                    </div>
                </form>
                <button onClick={() => setIsConfirm(true)} className="w-full h-fit py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-75">Save</button>
            </div>
            {isConfirm && (
                <div className="fixed z-50 top-0 bottom-0 w-full max-w-sm mx-auto flex items-center justify-center">
                    <div className="w-full h-full bg-black/50 absolute top-0 left-0"></div>
                    <div className="w-5/6 h-fit rounded-2xl bg-white relative z-10 p-5">
                        <div className="pb-2 border-b-2 mb-2">
                            <h2 className='text-xl font-semibold'>Konfirmasi Pembuatan</h2>
                        </div>
                        <div className="h-[400px] overflow-y-auto">
                            <p className='text-sm mb-5'>Periksa data sebelum Konfirmasi</p>
                            <div className="mb-4">
                                <p className='text-xs text-slate-500 italic'>Kode unit Ac:</p>
                                <p className='font-semibold'>{isInputData.unit_code}</p>
                            </div>
                            <div className="mb-4">
                                <p className='text-xs text-slate-500 italic'>Merk Ac:</p>
                                <p className='font-semibold'>{isInputData.brand}</p>
                            </div>
                            <div className="mb-4">
                                <p className='text-xs text-slate-500 italic'>Tipe merk/PK:</p>
                                <p className='font-semibold'>{isInputData.type} / {isInputData.PK}</p>
                            </div>
                            <div className="mb-4">
                                <p className='text-xs text-slate-500 italic'>Lokasi Ac:</p>
                                <p className='font-semibold'>Gedung {isInputLoc.building}{'>'}Lantai {isInputLoc.floor}{'>'}Ruang {isInputLoc.room}</p>
                            </div>
                            <div className="mb-4">
                                <p className='text-xs text-slate-500 italic'>Tanggal pasang:</p>
                                <p className='font-semibold'>{isInputData.installed_at}</p>
                            </div>
                        </div>
                        <div className="w-full flex gap-2">
                            <button onClick={() => setIsConfirm(false)} className='flex-1 rounded-xl py-2 px-4 border-2 border-blue-600'>Cancel</button>
                            {/* <button onClick={handleSubmitForm} className='flex-1 rounded-xl py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-75'>Confirm</button> */}
                            <button
                                onClick={handleSubmitForm}
                                className={`flex items-center justify-center rounded-xl py-2 px-4 
        ${isLoadingSubmition ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-900'} 
        text-white duration-75`}
                                disabled={isLoadingSubmition} // Disable button when loading
                            >
                                {isLoadingSubmition ? (
                                    <>
                                        <Spin />
                                        Loading...
                                    </>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewAc