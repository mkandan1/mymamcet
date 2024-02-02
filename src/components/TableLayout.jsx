import React from 'react'

export const TableLayout = ({rows, cols, rowStart, colStart, children }) => {
    return (
        <div className={`col-span-${cols} grid grid-cols-${cols} grid-rows-${rows} w-full overflow-auto`}>
            {children}
        </div>
    )
}
