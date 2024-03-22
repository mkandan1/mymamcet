import React from 'react'

export const SocialLoginButton = ({ text, icon }) => {
    return (
        <button className='w-full py-[10px] px-[16px] flex justify-center items-center gap-x-2 font-bold text-sm tracking-tighter text-t1 rounded-full hover:bg-opacity-90 border-2 border-gray-200 active:border-gray-500'>
            <img src={icon} className='w-6'/>
            {text}
        </button>
    )
}
