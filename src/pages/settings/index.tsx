import React from 'react'
import TopBar from '@/components/elements/topBar'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'
import BottomBar from '@/components/elements/bottomBar'

const Settings = () => {
    const { push } = useRouter()
    return (
        <div className='w-full h-full bg-slate-50 relative pt-16'>
            <TopBar backButton={true} title='Settings' search={false} />
            <div className="w-full h-full py-5 px-4">
                <div className="w-full px-4">
                    <p className='py-2 border-b-2 w-full mb-1 font-semibold'>Data Informasi</p>
                </div>
                <button
                    onClick={() => push('/settings-lokasi')}
                    className="w-full py-2 px-4 flex items-center hover:bg-slate-200 justify-between">
                    <p>Lokasi</p>
                    <ChevronRight />
                </button>
                <button
                    onClick={() => push('/new-ac')}
                    className="w-full py-2 px-4 flex items-center hover:bg-slate-200 justify-between">
                    <p>Ac</p>
                    <ChevronRight />
                </button>
            </div>
            <BottomBar />
        </div>
    )
}

export default Settings