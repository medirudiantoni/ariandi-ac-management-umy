import React, { useState } from 'react'
import TopBar from '@/components/elements/topBar'
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import toast from 'react-hot-toast';

interface RoleType {
    id: number;
    title: string;
}

interface RoleResponse {
    data: RoleType[];
}

const Settings = () => {
    const { data: roleData, error: roleError } = useSWR<RoleResponse>('/api/role', fetcher);

    const [isInputValues, setIsInputValues] = useState({
        name: "",
        role: "",
        password: ""
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!isInputValues.role){
            toast.error('Role harus diisi!')
        };
    }

    if (roleError) return <div>Error loading data</div>;

    return (
        <div className='w-full h-full bg-slate-50 relative pt-20'>
            <TopBar backButton={true} title='Tambah pengguna baru' search={false} />
            <div className="w-full h-full px-8 flex flex-col pb-5">
                <div className="flex-1 w-full">
                    <form>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="name" className='font-bold'>Nama</label>
                            <input value={isInputValues.name} onChange={(e) => setIsInputValues({...isInputValues, name: e.target.value})} name='name' id='name' type="text" className='w-full py-2 px-4 rounded-md bg-slate-200 outline-none' placeholder='Pengguna baru' />
                        </div>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="role" className='font-bold'>Role</label>
                            <select
                                onChange={(e) => setIsInputValues({...isInputValues, role: e.target.value})}
                                name='role'
                                id='role'
                                className='w-full py-2 px-4 rounded-md bg-slate-200 outline-none'
                            >
                                <option defaultChecked className='text-slate-500'>Pilih role</option>
                                {roleData?.data.map((data) => (
                                    <option key={data.id} value={data.id}>{data.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full h-fit flex flex-col mb-2">
                            <label htmlFor="password" className='font-bold'>Password</label>
                            <input name='password' id='password' type="password" className='w-full py-2 px-4 rounded-md bg-slate-200 outline-none' placeholder='Buat password sementara' onChange={(e) => setIsInputValues({...isInputValues, password: e.target.value})} />
                        </div>
                    </form>
                </div>
                <button onClick={onSubmit} className='w-full py-2 px-4 rounded-xl border bg-slate-50 hover:bg-blue-500 hover:text-white active:bg-blue-800 active:scale-95 duration-75'>Simpan</button>
            </div>
        </div>
    )
}

export default Settings;