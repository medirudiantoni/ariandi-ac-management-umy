import { useRouter } from 'next/router';
import React from 'react'

interface LocResultType {
    onChoose: () => void;
    result: string;
}

const LocResult: React.FC<LocResultType> = ({ onChoose, result }) => {
    const { push } = useRouter();
    return (
        <button onClick={onChoose} className="w-full text-start inline-block py-2 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 active:bg-blue-500 active:scale-95 duration-75 mb-2">
            <p className="text-sm text-slate-500">Lokasi</p>
            <p>{result}</p>
        </button>
    )
}

export default LocResult