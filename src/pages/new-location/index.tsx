import InputRoom from '@/components/elements/inputRoom';
import TopBar from '@/components/elements/topBar'
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const NewLocation = () => {
    const router = useRouter();
    const [isBuildingName, setIsBuildingName] = useState<string>("");
    const [isBuilding, setIsBuilding] = useState<string>("");
    const [isFloorLength, setIsFloorLength] = useState<number>(0);
    const [roomsPerFloor, setRoomsPerFloor] = useState<number[]>([]);

    const handleFloorCountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const count: number = parseInt(e.target.value) || 0;
        setIsFloorLength(count);

        const updatedRooms: number[] = Array.from({ length: count }, () => 1);
        setRoomsPerFloor(updatedRooms);
    };

    const handlePlusFloorCount = () => {
        const result = isFloorLength + 1;
        setIsFloorLength(result);
    }
    const handleMinusFloorCount = () => {
        const result = isFloorLength <= 0 ? 0 : isFloorLength - 1;
        setIsFloorLength(result);
    };

    const handlePlusRoom = (floorIndex: number) => {
        const updatedRooms: number[] = [...roomsPerFloor];
        updatedRooms[floorIndex] ? updatedRooms[floorIndex] = updatedRooms[floorIndex] : updatedRooms[floorIndex] = 1; 
        const newRoomCount = updatedRooms[floorIndex] + 1;
    
        if (newRoomCount <= 10) {
            updatedRooms[floorIndex] = newRoomCount;
            setRoomsPerFloor(updatedRooms);
        }
    };

    const handleResetRoom = (floorIndex: number) => {
        const updatedRooms: number[] = [...roomsPerFloor];
    
        // Reset jumlah kamar pada lantai tertentu ke 1
        updatedRooms[floorIndex] = 1;
    
        // Update state dengan array yang telah diubah
        setRoomsPerFloor(updatedRooms);
    };
    
    const handleMinusRoom = (floorIndex: number) => {
        const updatedRooms: number[] = [...roomsPerFloor];
        const newRoomCount = updatedRooms[floorIndex] - 1;
    
        if (newRoomCount >= 1) {
            updatedRooms[floorIndex] = newRoomCount;
            setRoomsPerFloor(updatedRooms);
        }
    };    

    const handleRoomCountChange = (floorIndex: number, value: string): void => {
        const updatedRooms: number[] = [...roomsPerFloor];
        updatedRooms[floorIndex] = value ? parseInt(value) : 1;
        setRoomsPerFloor(updatedRooms);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const data = {
            name: isBuildingName,
            building: isBuilding.length == 0 ? isBuildingName : isBuilding,
            floors: roomsPerFloor.map((roomCount: number, index: number) => ({
                floor: index + 1,
                roomCount,
            })),
        };

        try {
            const response = await fetch(`/api/v1/locationMany`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to save location');
            }
            toast.success("Data lokasi berhasil disimpan!");
            router.replace('/settings');
        } catch (error) {
            console.error('Error saving location:', error);
            alert('Gagal menyimpan data lokasi.');
        }
    };

    return (
        <div className='w-full h-full bg-slate-50 relative pt-16'>
            <TopBar backButton={true} title='New Location' search={false} />
            <div className="w-full h-full p-5 overflow-y-auto">
                <form onSubmit={handleSubmit} className='w-full h-full flex flex-col gap-2'>
                    <div className="flex-1 flex flex-col gap-2.5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="building">Gedung:</label>
                            <input onChange={(e) => setIsBuilding(e.target.value)} type="text" id='building' placeholder='Contoh: E6' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="building">Nama Gedung:</label>
                            <input onChange={(e) => setIsBuildingName(e.target.value)} type="text" id='building' placeholder='Contoh: KH. Ibrahim' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                required />
                        </div>
                        <div className="flex flex-col gap-1.5 mb-4 pb-4 border-b-2">
                            <label htmlFor="floor">
                                <p className='mb-1'>Jumlah Lantai:</p>
                                <div className="w-full h-fit flex gap-2">
                                    <div onClick={handleMinusFloorCount} className='cursor-pointer py-2 px-4 rounded-xl bg-orange-600 text-white active:scale-95 duration-75'><Minus /></div>
                                    <input value={isFloorLength} onChange={handleFloorCountChange} type="number" id='floor' min={1} max={10} placeholder='Min 1, max 10' className='w-full py-2 px-4 rounded-xl bg-slate-100 outline-none border-2 text-center'
                                        required />
                                    <div onClick={handlePlusFloorCount} className='cursor-pointer py-2 px-4 rounded-xl bg-blue-600 text-white active:scale-95 duration-75'><Plus /></div>
                                </div>
                            </label>
                        </div>
                        <div className="mb-6 flex flex-col gap-2 items-end">
                            {Array.from({ length: isFloorLength }, (_, index) => (
                                <div key={index} className="flex flex-col gap-1.5">
                                    <label htmlFor={`roomCount-${index}`}>
                                        <p className="mb-1.5">Jumlah Ruangan lantai {index + 1}:</p>
                                        <div className="flex items-center gap-2">
                                            <InputRoom onMinus={() => handleMinusRoom(Number(index))} onPlus={() => handlePlusRoom(Number(index))} onReset={() => handleResetRoom(Number(index))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoomCountChange(index, e.target.value)} value={roomsPerFloor[index] ? roomsPerFloor[index] : 1} />
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type='submit' className="w-full h-fit py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-75">Save</button>
                </form>
            </div>
        </div>
    )
}

export default NewLocation