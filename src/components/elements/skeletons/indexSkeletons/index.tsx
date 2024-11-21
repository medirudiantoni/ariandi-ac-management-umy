import React from 'react'
import LayoutSkeleton from '../../layoutSkeleton'

const IndexSkeleton = () => {
    return (
        <LayoutSkeleton>
            <div className="w-full h-fit px-5 pt-24 pb-2">
                    <div className="w-20 aspect-square bg-slate-200 mb-5"></div>
                    <div className="w-full h-20 flex gap-2 mb-5">
                        <div className="flex-1 h-full bg-slate-200"></div>
                        <div className="flex-1 h-full bg-slate-200"></div>
                        <div className="flex-1 h-full bg-slate-200"></div>
                    </div>
                    <div className="w-full h-16 mb-3 bg-slate-200"></div>
                    <div className="w-full h-64 mb-2 bg-slate-200"></div>
                </div>
        </LayoutSkeleton>
    )
}

export default IndexSkeleton