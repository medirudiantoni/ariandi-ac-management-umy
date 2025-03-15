import React from 'react'
import TopBar from '@/components/elements/topBar'

const Settings = () => {
    return (
        <div className='w-full h-full bg-slate-50 relative pt-24'>
            <TopBar backButton={true} title='Atur password' search={false} />
            <div className="w-full h-full px-8 flex flex-col pb-5">
                <div className="flex-1 w-full">
                    <form>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="name" className='font-bold'>Password sebelumnya</label>
                            <input name='name' id='name' type="password" className='w-full py-2 px-4 rounded-md bg-slate-100 border-2' placeholder='Password sebelumnya' />
                        </div>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="password" className='font-bold'>Ganti password</label>
                            <input name='password' id='password' type="password" className='w-full py-2 px-4 rounded-md bg-slate-100 border-2' placeholder='Ganti password' />
                        </div>
                        <button className='w-full py-2 px-4 rounded-md mt-3 border-2 bg-slate-50 hover:bg-blue-500 hover:text-white active:bg-blue-800 active:scale-95 duration-75'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings;