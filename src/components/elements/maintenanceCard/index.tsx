import React from 'react'

const MaintenanceCardType = {
  
}

const MaintenanceCard = () => {
  return (
    <div className='w-full h-fit p-4 rounded-2xl bg-slate-200 flex items-start gap-2'>
        <div className="w-fit px-2 mr-2">
            <p className="text-2xl font-bold">1</p>
        </div>
        <div className="flex-1">
            <p className='text-sm text-slate-600'>20 Oktober 2024</p>
            <p className='text-lg font-medium'>Pembersihan</p>
            <p className='mt-2 text-blue-700'>Sedang berlangsung...</p>
        </div>
    </div>
  )
}

export default MaintenanceCard