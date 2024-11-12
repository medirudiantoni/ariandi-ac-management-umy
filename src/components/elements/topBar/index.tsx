import React from 'react'
import { ArrowLeft, ArrowLeftIcon, Bell, MoveLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation';

type TopBarProps = {
  backButton?: boolean;
  title: string;
  search?: boolean;
}

const TopBar:React.FC<TopBarProps> = ({backButton = false, title, search = true}) => {
  const { back } = useRouter();
  return (
    <div className="fixed z-20 top-0 mx-auto w-full max-w-sm flex items-center justify-between py-5 px-2 bg-slate-50">
      {backButton ? (<button onClick={() => back()} className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
        <ArrowLeftIcon />
      </button>) : <div className='w-10 aspect-square'></div>}
      <h2 className="text-xl font-bold text-slate-509">{title}</h2>
      <div className="flex items-center gap-0.5">
        {search ? (<button className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
          <Search />
        </button>) : <div className='w-10 aspect-square'></div>}
      </div>
    </div>
  )
}

export default TopBar