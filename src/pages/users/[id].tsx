import React from 'react'
import TopBar from '@/components/elements/topBar'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'
import BottomBar from '@/components/elements/bottomBar'

const Settings = () => {
    return (
        <div className='w-full h-full bg-slate-50 relative pt-20'>
            <TopBar backButton={true} title='Kim Jong Unch' search={false} />
            <div className="w-full h-full px-8 flex flex-col pb-5">
                <div className="flex-1 w-full">
                    <form>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="name" className='font-bold'>Ganti nama</label>
                            <input id='name' name='name' type="text" className='w-full py-2 px-4 rounded-md bg-slate-100 border-2' placeholder='Ganti nama' value={'Kim Jong Unch'} />
                        </div>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="role" className='font-bold'>Ganti role</label>
                            <select
                                name='role'
                                id='role'
                                className='w-full py-2 px-4 rounded-md bg-slate-100 border-2'
                            >
                                <option value="" selected>Admin</option>
                                <option value="" selected>Member</option>
                            </select>
                        </div>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="password" className='font-bold'>Ganti password</label>
                            <input name='password' id='password' type="password" className='w-full py-2 px-4 rounded-md bg-slate-100 border-2' placeholder='Ganti nama' value={'Kim Jong Unch'} />
                        </div>
                    </form>
                </div>
                <button className='w-full py-2 px-4 rounded-xl border bg-slate-50 hover:bg-blue-500 hover:text-white active:bg-blue-800 active:scale-95 duration-75'>Simpan</button>
            </div>
        </div>
    )
}

export default Settings;