import React from 'react'

export const TableLayout = ({rows, cols, rowStart, colStart, px, children }) => {
    return (
        <div className={`col-span-${cols} grid grid-cols-${cols} grid-rows-${rows} row-span-${rows} w-full overflow-auto px-${px? px : 0}`}>
            {children}
        </div>
    )
}
