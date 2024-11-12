import TopBar from '@/components/elements/topBar';
import React, { useEffect, useState } from 'react'
import BottomBar from '@/components/elements/bottomBar';
import Link from 'next/link';

const index = () => {
  const [isLoc, setIsLoc] = useState<any>({
    building: 0,
    floor: 0,
    room: 0
  });
  const [isDataAc, setIsDataAc] = useState<[]>([]);
  const [isOperatingAc, setIsOperatingAc] = useState([]);
  const [isNotOperatingAc, setIsNotOperatingAc] = useState([]);

  useEffect(() => {
    if(isDataAc.length > 0){
      // const operAc = isDataAc.filter((item: any) => item.condition == true);
      setIsOperatingAc(isDataAc.filter((item: any) => item.condition == true));
      setIsNotOperatingAc(isDataAc.filter((item: any) => item.condition == false));
    }
  }, [isDataAc]);

  useEffect(() => {
    const getLoc = async () => {
      try {
        const response = await fetch(`/api/v1/location`).then(res => res.json());
        const building = new Set(response.data.map((item: any) => item.building)).size;
        const floor = new Set(response.data.map((item: any) => `${item.building}-${item.floor}`)).size;
        const room = new Set(response.data.map((item: any) => `${item.building}-${item.floor}-${item.room}`)).size;
        setIsLoc({ building, floor, room });
      } catch (error) {
        console.log(error);
        setIsLoc({ building: 0, floor: 0, room: 0 });
      }
    };
    const getAllAc = async () => {
      try {
        const response = await fetch(`/api/v1/ac`).then(res => res.json());
        setIsDataAc(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    getLoc();
    getAllAc();
  }, [])

  return (
    <div className='w-full h-full bg-slate-50 relative pt-20 pb-40'>
      <TopBar backButton={false} title='UmyAc' search={true} />
      <div className="w-full h-full px-5 border-blue-200 flex flex-col gap-2">
        <Link href='/triversal' className="w-full h-fit py-4 rounded-2xl flex flex-col gap-4 cursor-pointer">
          <div className="">
            <p className='mb-1'>total Ac:</p>
            <div className="flex items-end gap-1">
              <p className='text-6xl font-semibold'>{isDataAc.length}</p>
              <p className='text-sm -translate-y-1'>unit</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc.building}</p>
              <p className='text-xs'>Gedung</p>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc.floor}</p>
              <p className='text-xs'>Lantai</p>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc.room}</p>
              <p className='text-xs'>Ruangan</p>
            </div>
          </div>
        </Link>
        <div className="w-full rounded-xl bg-green-200 p-4 flex justify-between">
          <p className='text-sm'>Ac yang beroperasi</p>
          <p className="text-2xl">{isOperatingAc.length} <span className="text-sm">unit</span></p>
        </div>
        <div className="w-full rounded-xl bg-orange-200 p-4">
          <div className="w-full p-4 flex justify-between">
            <p className="text-sm">Ac yang tidak beroperasi</p>
            <p>
              <span className="text-2xl">{isNotOperatingAc.length} </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full p-4 flex justify-between bg-orange-100 rounded-lg mb-2">
            <p className="text-sm">Sedang pemeliharaan</p>
            <p>
              <span className="text-2xl">5 </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full p-4 flex justify-between bg-orange-100 rounded-lg mb-2">
            <p className="text-sm">Sedang Rusak</p>
            <p>
              <span className="text-2xl">15 </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full flex gap-2">
            <div className="flex-1 rounded-md p-4 bg-orange-300">
              <p className='text-xs mb-1'>Belum diperbaiki</p>
              <p>
                <span className="text-xl font-semibold">5 </span>
                <span className="text-sm">unit</span>
              </p>
            </div>
            <div className="flex-1 rounded-md p-4 bg-orange-300">
              <p className='text-xs mb-1'>Sedang diperbaiki</p>
              <p>
                <span className="text-xl font-semibold">10 </span>
                <span className="text-sm">unit</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default index;