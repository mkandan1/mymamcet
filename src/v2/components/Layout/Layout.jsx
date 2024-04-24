import React from 'react'
import { Header } from '../Header/Header'
import { Icon } from '@iconify/react/dist/iconify.js'

export const Layout = ({ children }) => {
  return (
    <>
      <div className='flex gap-1 bg-gray-200'>
        <div className='hidden w-20 bg-white h-screen pt-5 md:flex flex-col items-center'>
          <div className='w-14 h-14 rounded-lg flex justify-center items-center text-white bg-blue-600 cursor-pointer' onClick={() => window.location.pathname = '/'}>
            <Icon icon={'mynaui:home'} className='text-3xl' />
          </div>
        </div>
        <Header children={children}/>
      </div>
    </>
  )
}
