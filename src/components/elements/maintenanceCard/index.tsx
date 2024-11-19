import formatDateTime from '@/lib/timeFormat';
import { query } from 'express';
import { useRouter } from 'next/router';
import React from 'react'

interface MaintenanceCardType {
  id: number;
  no: number;
  date: Number;
  maintenance_type: String;
  status: String;
}

const MaintenanceCard: React.FC<MaintenanceCardType> = ({ id, no, date, maintenance_type, status }) => {
  const { push } = useRouter();
  const time = new Date(Number(date));
  const time_start = formatDateTime(Number(time));
  const handleRedirectToDetailMaintenance = () => {
    push(`/maintenance/${id}`);
  };
  return (
    <button onClick={handleRedirectToDetailMaintenance} className='w-full h-fit p-4 text-start rounded-2xl bg-slate-200 hover:bg-slate-300 active:scale-95 duration-75 flex items-start gap-2'>
        <div className="w-fit px-2 mr-2">
            <p className="text-2xl font-bold">{no}</p>
        </div>
        <div className="flex-1">
            <p className='text-sm text-slate-600'>{time_start}</p>
            <p className='text-sm text-slate-600'>id: {id}</p>
            <p className='text-lg font-medium'>{maintenance_type}</p>
            <p className='mt-2 text-blue-700'>{status}</p>
        </div>
    </button>
  )
}

export default MaintenanceCard