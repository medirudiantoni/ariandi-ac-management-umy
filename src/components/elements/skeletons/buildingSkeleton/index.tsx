import React from 'react'
import LayoutSkeleton from '../../layoutSkeleton'

const BuildingSkeleton = () => {
    return (
        <LayoutSkeleton>
            <div className="w-full p-5 pt-20 animate-pulse">
                <div className="w-full h-fit py-5 px-3 bg-slate-100 flex justify-between items-center">
                    <div className="w-20 p-2.5 bg-slate-50"></div>
                    <div className="w-24 p-2.5 bg-slate-50"></div>
                </div>
                <div className="w-full h-28 mb-2 bg-slate-200"></div>
                <div className="w-full h-10 mb-5 bg-slate-200"></div>
                <div className="w-full h-10 bg-slate-200"></div>
            </div>
        </LayoutSkeleton>
    )
}

export default BuildingSkeleton