import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export const Page404 = () => {
  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
      <div className='h-full pt-24 md:ml-96'>
        <PageHeader title='Oops! Page Not Found' enablePath={false} />

        <div className='w-full mt-52 flex justify-center items-center text-slate-600'>
           <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2'/> <h4>Error 404</h4> <div className='w-[1.5px] h-5 mx-2 bg-slate-500'></div> <h4>Page not found</h4>
        </div>
        <h5 className='text-slate-400 text-center text-xs mt-5'>If this issue persists, please reach out to your administrator for further assistance.</h5>
      </div>
    </div>
  )
}
