import React from 'react'

export const LayoutHeader = ({title}) => {
    return (
        <div className='row-span-1 row-start-1 col-span-12 grid grid-rows-[auto] items-center rounded-t-[5px] px-4 bg-white mx-4 mt-4 border-t border-l border-r border-gray-300'>
            <h3 className='text-lg tracking-tighter font-semibold font-manrope text-gray-800'>{title}</h3>
        </div>
    )
}
