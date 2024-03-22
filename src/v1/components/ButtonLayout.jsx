import React from 'react'

export const ButtonLayout = ({ cols, marginTop, children }) => {
    const colSpan = cols ? cols : '12';
    return (

        <div className={`grid grid-cols-${colSpan} grid-rows-1 gap-x-4 col-span-${colSpan} items-center mt-${marginTop ? marginTop : '4'} mb-4`}>
            <div className={`col-span-${colSpan} flex gap-2 justify-end`}>
                {children}
            </div>
        </div>
    )
}
