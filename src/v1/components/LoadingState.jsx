import { Icon } from '@iconify/react'
import React from 'react'

export const LoadingState = ({ isLoading, rows, cols, children }) => {
    return (
        <>
            {isLoading ? (
                <div className='flex justify-center col-span-12 row-span-8'>
                    <Icon icon={'eos-icons:three-dots-loading'} className='text-5xl'></Icon>
                </div>
            ) : (
                <div className={`col-span-${cols} row-span-${rows} grid grid-cols-${cols} grid-rows-${rows} overflow-auto custom-scrollbar`}>
                    {children}
                </div>
            )}
        </>
    )
}
