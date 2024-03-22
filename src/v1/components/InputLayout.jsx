import React from 'react'

export const InputLayout = ({rows, cols, overflow, children}) => {
  return (
    <div className={`grid grid-cols-${cols} grid-rows-${rows} col-span-${cols} row-span-${rows} gap-2 mt-2 ${overflow? 'overflow-auto' : ''} overflow-x-auto`}>
        {children}
    </div>
  )
}
