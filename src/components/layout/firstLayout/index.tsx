import React from 'react'

const FirstLayout = ({children}: any) => {
  return (
    <div className='w-full min-h-screen bg-neutral-400 flex items-center justify-center'>
      <p className='text-2xl font-semibold'>{children}</p>
    </div>
  )
}

export default FirstLayout