import React from 'react';

export const Input = ({ type, value, onChange, label, rowStart, colStart, inputColSize }) => {
    return (

        <>
            <div className={`col-span-5 grid grid-rows-1 grid-cols-5 row-start-${rowStart ? rowStart : ''} col-start-${colStart ? colStart : ''}`}>
                <label className='text-gray-500 col-span-2 font-medium text-base'>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`bg-white border-[1px] col-span-${inputColSize? inputColSize : '2'} border-gray-300 rounded-md h-[42px] text-gray-500 font-manrope w-full text-sm`}
                >
                </input>
            </div>
        </>
    );
};