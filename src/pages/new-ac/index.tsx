import TopBar from '@/components/elements/topBar'
import LocType from '@/types/locData';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const NewAc = () => {
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isLoc, setIsLoc] = useState<{
        building: string[];
        floor: string[];
        room: string[];
        dataRoom: LocType[];
    }>({
        building: [],
        floor: [],
        room: [],
        dataRoom: [],
    });

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
            toast.success('Menambah data Ac baru Sukses!');
        } catch (error) {
            console.log(`Error saat mengirim data: ${error}`);
            toast.custom(<div className='text-red-600 py-2 px-4 rounded-full bg-white flex items-center gap-2'><X /> <p>Kode unit sudah digunakan</p></div>)
            setIsConfirm(false)
        }
    };

    useEffect(() => {
        async function getLoc() {
            try {
                const res = await fetch(`/api/v1/location/building`).then(res => res.json());
                const buildings = res.data.map((item: LocType) => item.building);
                setIsLoc({ ...isLoc, building: buildings });
            } catch (error) {
                console.log(error)
            }
        }
        async function getFloor(floor: string) {
            try {
                const res = await fetch(`/api/v1/location/building/${floor}`).then(res => res.json());
                const floors = res.data.map((item: LocType) => item.floor);
                setIsLoc(prevState => ({
                    ...prevState,
                    floor: floors
                }));

            } catch (error) {
                console.log(error)
            }
        }
        async function getRoom(floor: string, room: string) {
            try {
                const res = await fetch(`/api/v1/location/building/${floor}/${room}`).then(res => res.json());
                const rooms = res.data.map((item: LocType) => item.room);
                setIsLoc(prevState => ({
                    ...prevState,
                    room: rooms,
                    dataRoom: res.data
                }));

            } catch (error) {
                console.log(error)
            }
        }

        getLoc();
        if (isInputLoc.building) {
            getFloor(isInputLoc.building)
        };
        if (isInputLoc.floor) {
            getRoom(isInputLoc.building, isInputLoc.floor)
        };
    }, [isInputLoc]);

    const handleSelectRoomChange = (id: number) => {
        const selectedData = isLoc.dataRoom.find((room: LocType) => room.id == Number(id));
        if(selectedData){
            setIsInputLoc({ ...isInputLoc, room: selectedData.room, id: String(selectedData.id) });
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
                                    onChange={e => setIsInputLoc({ ...isInputLoc, building: e.target.value })}
                                    value={isInputLoc.building}
                                    id='select-building'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Gedung</option>
                                    {isLoc.building && isLoc.building.map((build, id) => (
                                        <option key={id} value={build}>{build}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={e => setIsInputLoc({ ...isInputLoc, floor: e.target.value })}
                                    value={isInputLoc.floor}
                                    id='select-floor'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Lantai</option>
                                    {isLoc.floor && isLoc.floor.map((floor, id) => (
                                        <option key={id} value={floor}>Lantai {floor}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={(e) => handleSelectRoomChange(Number(e.target.value))}
                                    value={isInputLoc.id}
                                    id='select-room'
                                    className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                >
                                    <option value="" disabled>Pilih Ruangan</option>
                                    {isLoc.dataRoom && isLoc.dataRoom.map((data: LocType, id) => (
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
                            <button onClick={handleSubmitForm} className='flex-1 rounded-xl py-2 px-4 bg-blue-600 text-white'>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewAc