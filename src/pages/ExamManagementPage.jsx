import React, { useLayoutEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleRight, faEye, faPlus, faSort } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const ExamManagementPage = () => {
  const [admin, setAdmin] = useState(true);
  const [departmentQuery, setDepartmentQuery] = useState([]);
  const [batchQuery, setBatchQuery] = useState([]);
  const [academicYearQuery, setAcademicYearQuery] = useState([]);
  const [semesterQuery, setSemesterQuery] = useState([]);
  const [subjectsQuery, setSubjectsQuery] = useState([]);
  const [examQuery, setExamQuery] = useState([]);
  // const []

  useLayoutEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/fetch/exam/options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => { return res.json() })
      .then((data) => {
        const search_options = data.search_options;
        setDepartmentQuery(search_options.departments);
        setAcademicYearQuery(search_options.academic_year);
        setBatchQuery(search_options.batch);
        setSemesterQuery(search_options.semester);
        setSubjectsQuery(search_options.subjects);
        setExamQuery(search_options.exam_type)
      })
  }, [])

  const handleSearchQuery = () => {
    
  }


  

  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4]'>
      <div className='flex'>
        <NavBar />
        <Header />
      </div>

      <div className='mt-20 md:ml-96 px-2'>
        <div className='flex flex-wrap gap-5 justify-between'>
          <div>
            <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>Exam Management</h1>
            <p className='text-slate-400 font-inter text-sm mt-3'>Management <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> <Link to={'/management/exam'} className='text-[#4285F4]'>Exam Management</Link></p>
          </div>
          <div>
            {/* <Link to='/management/batch/add'><button className='bg-[#4285F4] font-inter text-xs text-white py-3 pl-4 pr-5 rounded-sm mr-3'><FontAwesomeIcon icon={faPlus} /> Add Batch</button></Link> */}
            <Link to='/management/exam/students/add'><button className='bg-[#4285F4] font-inter text-xs text-white py-3 pl-4 pr-5 rounded-sm mr-3'><FontAwesomeIcon icon={faPlus} /> Add Student</button></Link>
          </div>
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
                    <option value="default">Department</option>
                    {
                      departmentQuery.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative flex items-center">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option value='default'>Batch</option>
                    {
                      batchQuery.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                  {
                    admin ? (
                      <FontAwesomeIcon icon={faAdd} className='text-[#9AB4C3] text-xs bg-white p-1 rounded-full border shadow-md shadow-[#e0e8ec] cursor-pointer ml-2' onClick={openAddBatchDialog} />
                    ) : <></>
                  }
                </div>
              </div>
            </div>

            <div className='flex flex-wrap'>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative flex items-center">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option value='default'>Academic Year</option>
                    {
                      academicYearQuery.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                  {
                    admin ? (
                      <FontAwesomeIcon icon={faAdd} className='text-[#9AB4C3] text-xs bg-white p-1 rounded-full border shadow-md shadow-[#e0e8ec] cursor-pointer ml-2' />
                    ) : <></>
                  }
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative flex items-center">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option value='default'>Semester</option>
                    {
                      semesterQuery.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                  {
                    admin ? (
                      <FontAwesomeIcon icon={faAdd} className='text-[#9AB4C3] text-xs bg-white p-1 rounded-full border shadow-md shadow-[#e0e8ec] cursor-pointer ml-2' />
                    ) : <></>
                  }
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative flex items-center">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                  <option value='default'>Subjects</option>
                    {
                      subjectsQuery.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                  </div>
                  <FontAwesomeIcon icon={faAdd} className='text-[#9AB4C3] text-xs bg-white p-1 rounded-full border shadow-md shadow-[#e0e8ec] cursor-pointer ml-2' />
                </div>
              </div>
              <div className='w-52 ml-2 mt-5 mr-2'>
                <div className="relative flex items-center">
                  <select
                    className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                    name="example"
                  >
                    <option value='default'>Exam Type</option>
                    {
                      examQuery.map((item, i)=>(
                        <option value={item} key={i}>{item}</option>
                      ))
                    }
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
        <TableOfResult />
      </div>
    </div>
  )
}

const TableOfResult = () => {
  return (
    <>
      <div className='ml-2 mt-10 overflow-x-auto'>
        <table className='table-auto overflow-scroll bg-blue-500 rounded-md'>
          <thead>
            <tr className='text-white'>
              <th className='font-normal font-inter p-3 text-sm'>Register Number <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Name <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Catogory <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Subject 1 <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Subject 2 <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Subject 3 <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Subject 4 <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Subject N <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Result <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
              <th className='font-normal font-inter p-3 text-sm'>Action <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
            </tr>
          </thead>
          <tbody className='text-center bg-white'>
            <tr className='hover:bg-blue-100'>
              <td className='text-gray-500 pt-2 pb-2'>812021205013</td>
              <td className='text-gray-500 pt-2 pb-2'>Elamaran E</td>
              <td className='text-gray-500 pt-2 pb-2'>B+</td>
              <td className='text-gray-500 pt-2 pb-2'>90</td>
              <td className='text-gray-500 pt-2 pb-2'>25</td>
              <td className='text-gray-500 pt-2 pb-2'>100</td>
              <td className='text-gray-500 pt-2 pb-2'>10</td>
              <td className='text-gray-500 pt-2 pb-2'>20</td>
              <td className='text-gray-500 pt-2 pb-2'>C</td>
              <td className='text-gray-500 pt-2 pb-2'><a className='text-blue-500 cursor-pointer'>Update</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
