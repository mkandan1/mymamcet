import React from 'react'

export const Button = ({text, onClick}) => {
  return (
    <button 
    onClick={onClick}
    className='w-full py-[10px] h-max-10 px-[16px] bg-t4 border-t4 font-bold text-sm tracking-tighter text-white rounded-[20px] hover:bg-opacity-90 border-2 active:border-sky-700'>
        {text}
    </button>
  )
}
