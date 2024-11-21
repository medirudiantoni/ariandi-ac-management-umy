import React from 'react'
import LayoutSkeleton from '../../layoutSkeleton'

const MaintenanceSkeleton = () => {
    return (
        <LayoutSkeleton>
            <div className="w-full h-full p-5 pt-20 animate-pulse flex flex-col">
                <div className="w-full flex-1">
                    <div className="w-2/5 h-7 bg-slate-200 mb-3.5"></div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-28 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-36 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-28 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-36 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-28 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-36 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-28 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-36 h-5 bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-28 h-5 bg-slate-200"></div>
                        <div className="w-4 h-5 text-end">:</div>
                        <div className="w-28 h-5 bg-slate-200"></div>
                    </div>
                </div>
                <div className="w-full h-10 bg-slate-200"></div>
            </div>
        </LayoutSkeleton>
    )
}

export default MaintenanceSkeleton