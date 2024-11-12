import React from 'react'

interface ButtonPrimaryType {
    onClick: VoidFunction;
    children: string;
};

const ButtonPrimary = ({onClick, children}: ButtonPrimaryType) => {
  return (
    <button onClick={onClick} className='py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95'>{children}</button>
  )
}

export const ButtonPrimaryOutline = ({onClick, children}: ButtonPrimaryType) => {
  return (
    <button onClick={onClick} className='py-2 px-4 rounded-xl border-2 border-blue-600 text-blue-600 active:scale-95'>{children}</button>
  )
}

export default ButtonPrimary