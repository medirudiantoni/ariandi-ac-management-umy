import React from 'react'
import TopBar from '@/components/elements/topBar'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'
import BottomBar from '@/components/elements/bottomBar'

const Settings = () => {
    const { push } = useRouter()
    return (
        <div className='w-full h-full bg-slate-50 relative pt-20'>
            <TopBar backButton={true} title='Atur pengguna' search={false} />
            <div className="w-full h-full px-4">
                <div className="w-full pb-2 px-2">
                    <div className="mb-4 flex">
                        <button onClick={() => push(`/users/new-user`)} className="py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 active:scale-95 duration-75">Tambah baru</button>
                    </div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className='mb-1'>
                                <th className='text-start'>No</th>
                                <th className='text-start'>Nama</th>
                                <th className='text-start'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={() => push(`/users/1`)} className='py-1.5 hover:bg-slate-200'>
                                <td className='py-2'>01</td>
                                <td className='py-2'>Ariandi</td>
                                <td className='py-2'>Admin</td>
                            </tr>
                            <tr onClick={() => push(`/users/1`)} className='py-1.5 hover:bg-slate-200'>
                                <td className='py-2'>02</td>
                                <td className='py-2'>Kim jong unch</td>
                                <td className='py-2'>User</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Settings