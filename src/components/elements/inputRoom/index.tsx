import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface InputRoomType {
    onMinus: () => void;
    onPlus: () => void;
    onReset: () => void;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRoom:React.FC<InputRoomType> = ({ onMinus, onPlus, onReset, value, onChange }) => {
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        if(isMounted){
            onReset();
            setIsMounted(false)
        }
    }, [onReset]);
    return (
        <div className="flex items-center gap-2">
            <button type='button' onClick={onMinus} className='cursor-pointer py-2 px-4 rounded-xl bg-orange-600 text-white active:scale-95 duration-75'><Minus /></button>
            <input type="number"
                value={value}
                onChange={onChange}
                min={1}
                max={10} placeholder='Min 1, max 10' className='w-full py-2 px-4 rounded-xl bg-slate-100 border-2 text-center'
                required
            />
            <button type='button' onClick={onPlus} className='cursor-pointer py-2 px-4 rounded-xl bg-blue-600 text-white active:scale-95 duration-75'><Plus /></button>
        </div>
    )
}

export default InputRoom