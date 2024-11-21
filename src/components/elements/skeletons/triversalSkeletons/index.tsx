import React from 'react'
import LayoutSkeleton from '../../layoutSkeleton'

const TriversalSkeleton = () => {
    return (
        <LayoutSkeleton>
            <div className="w-full h-full p-5 pt-28 animate-pulse">
                <div className="w-full flex gap-7 mb-12 items-center">
                    <div className="flex-1 h-1 bg-slate-200"></div>
                    <div className="w-5 aspect-square bg-slate-200"></div>
                    <div className="w-5 aspect-square bg-slate-200"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-full h-32 bg-slate-200"></div>
                    <div className="w-full h-32 bg-slate-200"></div>
                    <div className="w-full h-32 bg-slate-200"></div>
                </div>
            </div>
        </LayoutSkeleton>
    )
}

export default TriversalSkeleton