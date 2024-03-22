import React from 'react';

export const Select = ({ value, onChange, options, placeholder, label, rowStart, colStart }) => {
    return (
        <>
            <div className={`row-span-1 col-span-5 grid grid-rows-1 grid-cols-5 row-start-${rowStart?rowStart : ''} col-start-${colStart?colStart : ''}`}>
                <label className='text-gray-500 font-medium col-span-2'>{label}</label>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)} // Ensure you pass the selected value to the parent component
                    className={`bg-white border-[1px] col-span-3 border-gray-300 outline-none rounded-md h-[42px] text-gray-500 font-manrope w-full text-sm`}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
