import React from 'react'
import { LayoutHeader } from './LayoutHeader'
import { Icon } from '@iconify/react'

export const Model = ({ title, show, rows, cols, children, onClose }) => {
    return (
        <div className={`${show ? '' : 'hidden'} grid grid-cols-${cols} rounded-md grid-rows-${rows} col-span-${cols} row-span-${rows} absolute right-0 left-0 top-0 bottom-0 bg-black items-center px-20 bg-opacity-30 z-50`}>
            <div className={`grid grid-cols-${cols} grid-rows-${rows - 5} row-span-${rows} bg-white col-span-${cols} border`}>
                <div className={`col-span-${cols} border flex items-center justify-between p-2 px-8`}>
                    <h3 className={`col-span-${cols} font-manrope text-blue-500`}>{title}</h3>
                    <Icon icon={'solar:close-square-linear'} className='cursor-pointer text-2xl' onClick={onClose}/>
                </div>

                <div className={`grid grid-cols-${cols} grid-rows-${rows} col-span-${cols} row-span-${rows} mt-4`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
