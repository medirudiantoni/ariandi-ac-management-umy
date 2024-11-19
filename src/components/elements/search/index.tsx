import { ArrowLeftIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import LocResult from './locResult';
import AcCard from '../acCard';
import LocType from '@/types/locData';
import AcDataType from '@/types/acData';

interface SearchElProps {
    onClose: () => void;
}

const SearchEl: React.FC<SearchElProps> = ({ onClose }) => {
    const [inputSearch, setInputSearch] = useState('');
    const [isSearchResult, setIsSearchResult] = useState<LocType[]>([]);

    const [isChoosenResult, setIsChoosenResult] = useState<boolean>(false);
    const [isChoosenResultAC, setIsChoosenResultAC] = useState<AcDataType[]>([]);
    const [isChoosenLoc, setIsChoosenLoc] = useState('');

    const handleInputSearch = (value: string) => {
        setInputSearch(value);
    };

    const handleChoose = (result: LocType) => {
        console.log('result: ', result);
        setIsChoosenResult(true);
        if(result.AC !== undefined){
            setIsChoosenResultAC(result.AC);
        }
        setIsChoosenLoc(`${result.alias}`);
    }

    useEffect(() => {
        if (inputSearch && inputSearch.length > 0) {
            fetch(`/api/v1/search/${inputSearch}`)
                .then(res => res.json())
                .then(res => setIsSearchResult(res.data))
                .catch(err => console.log('error: ', err))
        } else {
            setIsSearchResult([]);
        }
    }, [inputSearch]);
    return (
        <div className='absolute z-20 top-0 left-0 w-full h-screen bg-black/40'>
            <div className="w-full pt-5 p-2 bg-white">
                <div className="flex items-center gap-1 border-b-2">
                    <input onChange={(e) => handleInputSearch(e.target.value)} name='search' type="text" className='flex-1 bg-white h-fit p-2 outline-none' placeholder='Cari lokasi' autoComplete='off' spellCheck='false' />
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
                        <X />
                    </button>
                </div>
            </div>
            {isSearchResult && (
                <div className="w-full p-4 bg-slate-50">
                    <p className="text-sm text-slate-500 mb-5">{isSearchResult.length} hasil pencarian</p>
                    <div className="w-full h-[78vh] pb-80 overflow-y-auto">
                        {isSearchResult.map(result => (
                            <LocResult key={result.id} onChoose={() => handleChoose(result)} result={`${result.name} ${result.alias}`} />
                        ))}
                    </div>
                </div>
            )}

            {isChoosenResult && (
                <div className="absolute z-30 top-0 left-0 w-full h-full bg-slate-50">
                    <div className="w-full py-5 px-2 mb-2 flex items-center justify-start">
                        <button onClick={() => setIsChoosenResult(false)} className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center mr-5'>
                            <ArrowLeftIcon />
                        </button>
                        <h2 className="text-xl font-bold text-slate-509">E6 307</h2>
                        <div className="opacity-0"></div>
                    </div>
                    <div className="w-full h-[85vh] overflow-y-auto flex flex-col gap-2 px-5">
                        {isChoosenResultAC && isChoosenResultAC.map(ac => (
                            <AcCard key={ac.id} brand={ac.brand} isMaintaining={ac.status.includes('Sedang') ? true : false} location={isChoosenLoc} status={ac.condition} href={`/detail-ac/${ac.id}`} lastMaintenance='' />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default SearchEl