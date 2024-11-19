// import ButtonPrimary, { ButtonPrimaryOutline } from '@/components/elements/button'
// import { signOut, useSession } from 'next-auth/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { CircleUserRound, Menu } from 'lucide-react';
import Sidebar from '../sidebar';

const Navbar = () => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  return (
    <nav className="w-full max-w-sm h-fit p-3 bg-slate-50 borderr-b flex gap-4 items-center justify-between absolute top-0 left-0 mx-auto z-20">
        <div className="">
          <button onClick={() => setIsSidebar(true)} className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
            <Menu />
          </button>
        </div>
        <div className="flex items-center gap-2">
            <h1 className='text-lg font-bold'>SimAc</h1>
        </div>
        <button className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
          <CircleUserRound />
        </button>
        <Sidebar onClose={() => setIsSidebar(false)} isOpen={isSidebar} />
        {/* {isSidebar && <Sidebar onClose={() => setIsSidebar(false)} />} */}
    </nav>
  )
}

export default Navbar