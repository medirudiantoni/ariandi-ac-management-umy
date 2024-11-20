import TopBar from '@/components/elements/topBar'
import { useRouter } from 'next/router'
import React from 'react'

const PrfoilePage = () => {
  const { push } = useRouter();
  return (
    <div className='w-full h-full bg-slate-50 relative pt-16'>
            <TopBar backButton={true} title='Profile' search={false} />
            <div className="w-full h-full py-5 px-8 flex flex-col justify-between">
                <div className="mb-2">
                    <div className="w-full mb-2">
                        <p className="text-slate-500 text-sm italic">Nama</p>
                        <p className="font-medium">Ken Arok</p>
                    </div>
                    <div className="w-full mb-2">
                        <p className="text-slate-500 text-sm italic">Peran</p>
                        <p className="font-medium">Penanggung jawab</p>
                    </div>
                    <div className="w-full">
                        <p className="text-slate-500 text-sm italic">Password</p>
                        <button onClick={() => push('/change-password')} className="font-medium text-blue-500 underline">Atur / Ganti password</button>
                    </div>
                </div>
                <button className='w-full py-2 px-4 rounded-xl border bg-slate-50 hover:bg-orange-500 hover:text-white active:bg-orange-800 active:scale-95 duration-75'>Logout</button>
            </div>
        </div>
  )
}

export default PrfoilePage