import React from 'react'

interface LayoutSkeletonProps {
    children: React.ReactNode;
}

const LayoutSkeleton: React.FC<LayoutSkeletonProps> = ({children}) => {
    return (
        <div className="relative w-full h-full flex flex-col bg-white">
            <div className="animate-pulse">
                {/* top bar */}
                <div className="fixed top-0 mx-auto w-full max-w-sm py-5 px-3 flex items-center">
                    <div className="flex-1"></div>
                    <div className="flex-1 flex justify-center">
                        <div className="w-full p-5 bg-slate-200"></div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <div className="w-10 aspect-square bg-slate-200"></div>
                    </div>
                </div>

                {children}

                {/* bottom bar */}
                <div className="fixed bottom-0 mx-auto w-full max-w-sm h-16 flex pt-3 justify-center">
                    <div className="w-20 h-6 flex justify-start">
                        <div className="w-8 h-full bg-slate-200"></div>
                    </div>
                    <div className="w-20 h-6 flex justify-center">
                        <div className="w-8 h-full bg-slate-200"></div>
                    </div>
                    <div className="w-20 h-6 flex justify-end">
                        <div className="w-8 h-full bg-slate-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutSkeleton