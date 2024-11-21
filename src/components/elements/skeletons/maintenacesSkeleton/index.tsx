import React from 'react'
import LayoutSkeleton from '../../layoutSkeleton'

const MaintenancesSkeleton = () => {
  return (
    <LayoutSkeleton>
      <div className="w-full h-full p-8 pt-24 animate-pulse">
        <div className="w-3/5 mb-3 h-7 bg-slate-200"></div>
        <div className="w-full mb-4 h-10 bg-slate-200"></div>
        <div className="w-full mb-3 h-32 bg-slate-200"></div>
        <div className="w-full mb-3 h-32 bg-slate-200"></div>
        <div className="w-full mb-3 h-32 bg-slate-200"></div>
      </div>
    </LayoutSkeleton>
  )
}

export default MaintenancesSkeleton