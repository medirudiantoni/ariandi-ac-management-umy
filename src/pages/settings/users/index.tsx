import React from 'react'
import TopBar from '@/components/elements/topBar'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import UserWithRole from '@/types/user';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Settings = () => {
    const { data, isLoading } = useSWR('/api/user', fetcher);
    const { push } = useRouter();
    if (isLoading) {
        return (
            <div className="w-full h-full bg-slate-50 relative pt-20 px-5">
                Loading...
            </div>
        )
    }
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
                            {data.users.map((user: UserWithRole, id: number) => (
                                <tr key={id} onClick={() => push(`/users/${user.id}`)} className='py-1.5 hover:bg-slate-200'>
                                    <td className='py-2'>{id + 1}</td>
                                    <td className='py-2'>{user.username}</td>
                                    <td className='py-2'>{user.role.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Settings