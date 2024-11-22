import React, { useState } from 'react'
import { ArrowLeftIcon, Search } from 'lucide-react'
import { useRouter as useRouterNav } from 'next/navigation';
import SearchEl from '../search';

type TopBarProps = {
  backButton?: boolean;
  title: string;
  search?: boolean;
  backAction?: VoidFunction;
}

const TopBar:React.FC<TopBarProps> = ({backButton = false, title, search = true, backAction}) => {
  const useNav = useRouterNav();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleBack = () => {
    useNav.back();
    if(backAction){
      backAction();
    }
  }
  
  return (
    <div className="fixed z-20 top-0 mx-auto w-full max-w-sm flex items-center justify-between py-5 px-2 bg-slate-50 shadow-sm">
      {backButton ? (<button onClick={handleBack} className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
        <ArrowLeftIcon />
      </button>) : <div className='w-10 aspect-square'></div>}
      <h2 className="text-xl font-bold text-slate-509">{title}</h2>
      <div className="flex items-center gap-0.5">
        {search ? (<button onClick={() => setIsSearch(true)} className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center'>
          <Search />
        </button>) : <div className='w-10 aspect-square'></div>}
      </div>
      {isSearch && <SearchEl onClose={() => setIsSearch(false)} />}
      
    </div>
  )
}

export default TopBar