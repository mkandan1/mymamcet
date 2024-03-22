import React from 'react';
import warning from '../../assets/vectors/warning.svg';
import { useSelector } from 'react-redux';

export const LoginFailed = ({error}) => {

    if(!error.show){
        return
    }
    return (
        <div className='w-full p-4 flex items-start mb-4 bg-red-50 text-red-500 rounded-md relative'>
            <img src={warning} alt="Warning icon" className='w-5' />
            <p className='text-[13px] pl-1'>{error.message}</p>
        </div>
    );
};
