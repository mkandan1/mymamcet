import React from 'react'

export const FormLayout = ({ children, rows, cols }) => {
    return (
        <div className={`row-span-${rows} h-screen col-span-${cols} grid grid-cols-${cols} grid-rows-${rows} bg-white mx-4 p-5 border-2 border-gray-200`}>
            <div className={`row-span-${rows} w-full h-full row-start-1 col-span-${cols} grid grid-cols-${cols} grid-rows-12 gap-x-5`}>
                {children}
            </div>
        </div>
    )
}
