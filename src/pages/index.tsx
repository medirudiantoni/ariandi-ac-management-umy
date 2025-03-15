import TopBar from '@/components/elements/topBar';
import React, { useEffect, useState } from 'react'
import BottomBar from '@/components/elements/bottomBar';
import Link from 'next/link';
import AcDataType from '@/types/acData';
import LocType from '@/types/locData';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useLocations } from '@/lib/zustand';
import IndexSkeleton from '@/components/elements/skeletons/indexSkeletons';
import { useSession } from 'next-auth/react';

interface IsLocStateType {
  building: number;
  floor: number;
  room: number;
}

const Index = () => {
  const [isDataAc, setIsDataAc] = useState<AcDataType[]>([]);

  const setDataLoc = useLocations(state => state.setDataLoc);

  const { data: locationData, error: locError } = useSWR('/api/v1/location', fetcher);
  const { data: acData, error: acError } = useSWR('/api/v1/ac', fetcher);

  useEffect(() => {
    if (acData) {
      if(acData.data){
        if(acData.data.length > 0){
          setIsDataAc(acData.data);
        }
      }
    }
  }, [acData]);

  const [isLoc, setIsLoc] = useState<IsLocStateType>({
    building: 0,
    floor: 0,
    room: 0
  });

  useEffect(() => {
    if (locationData) {
      if(locationData.data){
        setDataLoc(locationData.data);
        const building = new Set(locationData.data.map((item: LocType) => item.building)).size;
        const floor = new Set(locationData.data.map((item: LocType) => `${item.building}-${item.floor}`)).size;
        const room = new Set(locationData.data.map((item: LocType) => `${item.building}-${item.floor}-${item.room}`)).size;
        setIsLoc({ building, floor, room });
      }
    }
  }, [locationData]);

  // Filter data AC berdasarkan kondisi
  const [isOperatingAc, setIsOperatingAc] = useState<AcDataType[]>([]);
  const [isNotOperatingAc, setIsNotOperatingAc] = useState<AcDataType[]>([]);
  const [isBrokenAc, setIsBrokenAc] = useState<AcDataType[]>([]);
  const [isUnderMaintenance, setIsUnderMaintenance] = useState<AcDataType[]>([]);
  const [isRepairing, setIsRepairing] = useState<AcDataType[]>([]);
  const [isNotRepairing, setIsNotRepairing] = useState<AcDataType[]>([]);

  useEffect(() => {
    if (isDataAc && isDataAc.length > 0) {
      setIsOperatingAc(isDataAc.filter((item) => item.condition == true));
      setIsNotOperatingAc(isDataAc.filter((item) => item.condition == false));
      setIsBrokenAc(isDataAc.filter((item) => item.is_broken == true));
      setIsUnderMaintenance(isDataAc.filter((item) => item.status.includes('Sedang')));
      setIsRepairing(isDataAc.filter((item) => item.is_broken == true && item.status.includes('Sedang')));
      setIsNotRepairing(isDataAc.filter((item) => item.is_broken == true && !item.status.includes('Sedang')));
    }
  }, [isDataAc]);

  const { data } = useSession();
  useEffect(() => {
    console.log("user: ", data);
  }, [data])

  // Loading state untuk SWR
  if (!acData || !locationData) return <IndexSkeleton />;
  if (locError || acError) return <div>Error loading data</div>;

  return (
    <div className='w-full h-full bg-slate-50 relative pt-20 pb-40'>
      <TopBar backButton={false} title='UmyAc' search={true} />
      <div className="w-full h-full px-5 border-blue-200 flex flex-col gap-2">
        <Link href='/triversal' className="w-full h-fit py-4 rounded-2xl flex flex-col gap-4 cursor-pointer">
          <div className="">
            <p className='mb-1'>total Ac:</p>
            <div className="flex items-end gap-1">
              <p className='text-6xl font-semibold'>{isDataAc && isDataAc.length}</p>
              <p className='text-sm -translate-y-1'>unit</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc && isLoc.building}</p>
              <p className='text-xs'>Gedung</p>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc && isLoc.floor}</p>
              <p className='text-xs'>Lantai</p>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-yellow-200">
              <p className="text-2xl">{isLoc && isLoc.room}</p>
              <p className='text-xs'>Ruangan</p>
            </div>
          </div>
        </Link>
        <div className="w-full rounded-xl bg-green-200 p-4 flex justify-between">
          <p className='text-sm'>Ac yang beroperasi</p>
          <p className="text-2xl">{isOperatingAc && isOperatingAc.length} <span className="text-sm">unit</span></p>
        </div>
        <div className="w-full rounded-xl bg-orange-200 p-4">
          <div className="w-full p-4 flex justify-between">
            <p className="text-sm">Ac yang tidak beroperasi</p>
            <p>
              <span className="text-2xl">{isNotOperatingAc && isNotOperatingAc.length} </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full p-4 flex justify-between bg-orange-100 rounded-lg mb-2">
            <p className="text-sm">Sedang pemeliharaan</p>
            <p>
              <span className="text-2xl">{isUnderMaintenance && isUnderMaintenance.length} </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full p-4 flex justify-between bg-orange-100 rounded-lg mb-2">
            <p className="text-sm">Sedang Rusak</p>
            <p>
              <span className="text-2xl">{isBrokenAc && isBrokenAc.length} </span>
              <span className="text-sm">unit</span>
            </p>
          </div>
          <div className="w-full flex gap-2">
            <div className="flex-1 rounded-md p-4 bg-orange-300">
              <p className='text-xs mb-1'>Belum diperbaiki</p>
              <p>
                <span className="text-xl font-semibold">{isNotRepairing && isNotRepairing.length} </span>
                <span className="text-sm">unit</span>
              </p>
            </div>
            <div className="flex-1 rounded-md p-4 bg-orange-300">
              <p className='text-xs mb-1'>Sedang diperbaiki</p>
              <p>
                <span className="text-xl font-semibold">{isRepairing && isRepairing.length} </span>
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

export default Index;