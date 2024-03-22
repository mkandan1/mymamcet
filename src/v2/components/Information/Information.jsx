import React from 'react'
import warning from '../../assets/vectors/warning.svg'

export const LoginFailed = () => {
    return (
        <div className='w-full p-4 flex items-start mb-4 bg-red-50 text-red-500 rounded-md relative'>
            <img src={warning} />
            <p className='text-[13px] pl-1'>Login failed! Please check and make sure you are entering the correct password.</p>
        </div>
    );
}