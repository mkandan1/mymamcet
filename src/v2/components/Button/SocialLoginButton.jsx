import React from 'react'

export const SocialLoginButton = ({text, icon}) => {
    return (
        <button className='w-full py-[10px] px-[16px] font-bold text-sm tracking-tight text-t1 rounded-[20px] hover:bg-opacity-90 border-2 border-white active:border-blue-500'>
            {icon}
            {text}
        </button>
    )
}
