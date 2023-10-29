import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export const DashboardPage = () => {
  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
      <div className='h-full pt-24 md:ml-96'>
        <PageHeader title='Dashboard' enablePath={false} />
      </div>
    </div>
  )
}
