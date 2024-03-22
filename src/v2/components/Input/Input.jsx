import React from 'react'
import warning from '../../assets/vectors/warning.svg'
export const Input = ({ type, label, placeholder, error, isPassword }) => {
    return (
        <div className='input_field pt-5'>
            <label className='text-sm text-t2 font-bold block tracking-tighter'>{label}</label>
            <div className='relative'>
                <input type={type} labe placeholder={placeholder} className='bg-white h-10 w-full pl-4 border-2 border-gray-200 rounded-[4px] text-t3 text-sm mt-1 outline-none' />
                {isPassword && <img src='https://www.mycamu.co.in/assets/login-imgs/eye.svg' className='absolute w-5 right-4 top-[35%] cursor-pointer'></img>}
            </div>
            <span className={`text-red-500 flex text-sm items-center gap-x-2 my-1 ${error ? '' : 'hidden'}`}>
                <img src={warning} alt='' />
                {error}
            </span>
        </div>
    )
}