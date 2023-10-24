import React from 'react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'

export const DashboardPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex'>
        <NavBar />
        <Header />
      </div>
      

        <div className='mt-20 md:ml-72 absolute top-0 md:top-5 left-0 lg:left-5 z-0'>
          <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>Dashboard</h1>
        </div>
    </div>
  )
}
