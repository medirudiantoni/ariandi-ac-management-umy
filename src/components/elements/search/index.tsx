import { ArrowLeftIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import LocResult from './locResult';
import AcCard from '../acCard';
import LocType from '@/types/locData';

interface SearchElProps {
    onClose: () => void;
}

interface SearchResponse {
    data: LocType[]
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SearchEl: React.FC<SearchElProps> = ({ onClose }) => {
    const [inputSearch, setInputSearch] = useState('');
    const [isChoosenResult, setIsChoosenResult] = useState<boolean>(false);
    const [isChoosenLoc, setIsChoosenLoc] = useState<LocType>({
        id: 0,
        alias: "",
        name: "",
        building: "",
        floor: "",
        room: "",
        fakultas: "",
        prodi: "",
        AC: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    const { data: searchResults } = useSWR<SearchResponse>(
        inputSearch.length > 0 ? `/api/v1/search/${inputSearch}` : null,
        fetcher
    );

    const handleInputSearch = (value: string) => {
        setIsLoading(true);
        setInputSearch(value);
    };

    const handleChoose = (result: LocType) => {
        setIsChoosenResult(true);
        setIsChoosenLoc(result);

        // Optional: You might want to store the AC data in state or pass it to a parent component
        // const choosenAcData = result.AC || [];
    }

    useEffect(() => {
        if (searchResults || inputSearch.length == 0) {
            setIsLoading(false)
        }
    }, [searchResults]);

    useEffect(() => {
        console.log(isChoosenLoc);
    }, [isChoosenLoc])

    return (
        <div className='absolute z-20 top-0 left-0 w-full max-w-sm overflow-x-hidden h-screen bg-black/40'>
            <div className="fixed top-0 w-full max-w-sm mx-auto pt-5 p-2 bg-white">
                <div className="flex items-center gap-1 border-b-2">
                    <input
                        onChange={(e) => handleInputSearch(e.target.value)}
                        name='search'
                        type="text"
                        className='flex-1 bg-white h-fit p-2 outline-none'
                        placeholder='Cari lokasi'
                        autoComplete='off'
                        spellCheck='false'
                    />
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
                        <X />
                    </button>
                </div>
            </div>

            <div className="w-full pt-14 p-2 bg-white"></div>

            {isLoading && (
                <div className="w-full p-4 bg-slate-50 pt-10">Loading...</div>
            )}

            {searchResults?.data && (
                <div className="w-full p-4 bg-slate-50">
                    <p className="text-sm text-slate-500 mb-5">{searchResults.data.length} hasil pencarian</p>
                    <div className="w-full h-[78vh] pb-80 overflow-y-auto">
                        {searchResults.data.map(result => (
                            <LocResult
                                key={result.id}
                                onChoose={() => handleChoose(result)}
                                result={`${result.name} ${result.alias}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isChoosenResult && (
                <div className="absolute z-30 top-0 left-0 w-full h-full bg-slate-50">
                    <div className="w-full py-5 px-2 mb-2 flex items-center justify-start">
                        <button
                            onClick={() => setIsChoosenResult(false)}
                            className='w-10 aspect-square rounded-full hover:bg-slate-200 flex items-center justify-center mr-5'
                        >
                            <ArrowLeftIcon />
                        </button>
                        <h2 className="text-xl font-bold text-slate-509">{isChoosenLoc && isChoosenLoc.alias}</h2>
                        <div className="opacity-0"></div>
                    </div>
                    <div className="w-full h-[85vh] overflow-y-auto flex flex-col gap-2 px-5">
                        {isChoosenLoc && isChoosenLoc.AC?.map((ac) => (
                            <AcCard
                                key={ac.id}
                                brand={ac.brand} 
                                isMaintaining={String(ac.status).includes('Sedang') ? true : false}
                                location={`${ac.loc.alias}`}
                                status={ac.condition}
                                href={`/detail-ac/${ac.id}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchEl