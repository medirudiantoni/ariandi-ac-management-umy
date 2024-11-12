import { House, Settings, Wrench } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

const BottomBar = () => {
    const router = useRouter();
    return (
        <div className="fixed bottom-0 mx-auto w-full max-w-sm bg-slate-200 px-5 py-2 flex justify-evenly">
            <button onClick={() => router.push('/')} className='w-fit px-5 h-10 rounded-full hover:bg-slate-300 flex items-center justify-center'>
                <House />
            </button>
            <button onClick={() => router.push('/')} className='w-fit px-5 h-10 rounded-full hover:bg-slate-300 flex items-center justify-center'>
                <Wrench />
            </button>
            <button onClick={() => router.push('/settings')} className='w-fit px-5 h-10 rounded-full hover:bg-slate-300 flex items-center justify-center'>
                <Settings />
            </button>
        </div>
    )
}

export default BottomBar