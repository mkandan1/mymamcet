import React from 'react'

export const SectionLayout = ({ title, children }) => {
  return (
    <div className='col-span-12 mt-4'>
      <div className='row-span-3 row-start-1 col-span-12 grid grid-cols-12 grid-rows-[auto] gap-x-4'>
        <div className='col-span-12 flex justify-between'>
          <h4 className='col-span-12 font-manrope text-md text-blue-500 tracking-tight'>{title}</h4>
          { children ? children : <></>}
        </div>
      </div>
    </div>
  )
}
