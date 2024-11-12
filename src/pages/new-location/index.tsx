import TopBar from '@/components/elements/topBar'
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const NewLocation = () => {
    const router = useRouter();
    const [isBuildingName, setIsBuildingName] = useState<string>("");
    const [isFloorLength, setIsFloorLength] = useState<number>(0);
    const [roomsPerFloor, setRoomsPerFloor] = useState<number[]>([]);

    const handleFloorCountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const count: number = parseInt(e.target.value) || 0;
        setIsFloorLength(count);

        const updatedRooms: number[] = Array.from({ length: count }, () => 1);
        setRoomsPerFloor(updatedRooms);
    };

    const handleRoomCountChange = (floorIndex: number, value: string): void => {
        const updatedRooms: number[] = [...roomsPerFloor];
        updatedRooms[floorIndex] = parseInt(value) || 1;
        setRoomsPerFloor(updatedRooms);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const data = {
            building: isBuildingName,
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

            if(!response.ok){
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
                            <label htmlFor="building">Nama Gedung:</label>
                            <input onChange={(e) => setIsBuildingName(e.target.value)} type="text" id='building' placeholder='Nama Gedung baru' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                            required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="floor">Jumlah Lantai:</label>
                            <input onChange={handleFloorCountChange} type="number" id='floor' min={1} max={10} placeholder='Min 1, max 10' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                            required />
                        </div>
                        <div className="mb-6">
                            {Array.from({ length: isFloorLength }, (_, index) => (
                                <div key={index} className="flex flex-col gap-1.5">
                                    <label htmlFor={`roomCount-${index}`}>Jumlah Ruangan lantai {index + 1}:</label>
                                    <input type="number"
                                    value={roomsPerFloor[index] || 1}
                                    onChange={e => handleRoomCountChange(index, e.target.value)} 
                                    min={1}
                                    max={10} placeholder='Min 1, max 10' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2'
                                    required
                                    />
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