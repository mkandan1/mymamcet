import React from 'react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const ExamManagementPage = () => {
  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4]'>
      <div className='flex'>
        <NavBar />
        <Header />
      </div>

      <div className='mt-10 lg:mt-20 md:ml-72 absolute top-0 md:top-5 left-0 lg:left-5 z-0'>
        <div>
          <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>Exam Management</h1>
          <p className='text-slate-400 font-inter text-sm mt-3'>Management <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> <Link to={'/management/exam'} className='text-[#4285F4]'>Exam Management</Link></p>
        </div>

        <div className='mt-20 w-full'>
          <div className='w-full flex flex-wrap'>
            <div className='flex flex-wrap'>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Deparment</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Batch</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap'>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Academic Year</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Semester</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Subject</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option>Exam Type</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-52 ml-2 mt-5 mr-2 flex items-end'>
              <div className="relative">
                <button className='bg-[#4285F4] font-inter text-xs text-white py-3 pl-4 pr-5 rounded-sm'><FontAwesomeIcon icon={faEye} className='mr-2' />Show Result</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
