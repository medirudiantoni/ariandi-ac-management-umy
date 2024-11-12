import React from 'react'
import TopBar from '@/components/elements/topBar'
import { useRouter } from 'next/router'
import { ChevronRight } from 'lucide-react'

const Settings = () => {
    const { push } = useRouter()
    return (
        <div className='w-full h-full bg-slate-50 relative pt-16'>
            <TopBar backButton={true} title='Settings-Lokasi' search={false} />
            <div className="w-full h-full flex flex-col p-5">
                <div className="w-full h-fit p-2">
                    <button
                        onClick={() => push('/new-location')}
                        className="w-full p-2 border-b-2 flex items-center hover:bg-slate-200 justify-between">
                        <p>Tambah Lokasi baru</p>
                        <ChevronRight />
                    </button>
                </div>
                <div className="w-full flex-1 p-2">
                    <p className="w-full px-2 flex items-center justify-between">Edit lokasi</p>
                </div>
            </div>
        </div>
    )
}

export default Settings