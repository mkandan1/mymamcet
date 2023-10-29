import React, { useLayoutEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleRight, faEye, faMagnifyingGlass, faPlus, faSort, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export const ExamManagementPage = () => {
  const [admin, setAdmin] = useState(true);
  const [departmentQuery, setDepartmentQuery] = useState([]);
  const [batchQuery, setBatchQuery] = useState([]);
  const [academicYearQuery, setAcademicYearQuery] = useState([]);
  const [semesterQuery, setSemesterQuery] = useState([]);
  const [examQuery, setExamQuery] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [isQueryLoaded, setIsQueryLoaded] = useState(false);
  const [isNoResult, setIsNoResult] = useState(false);

  // Loading states
  const [showLoading, setShowLoading] = useState(false);


  const [selectedQueries, setSelectedQueries] = useState([{ department: 'default', batch: 'default', academic_year: 'default', semester: 'default', exam_type: 'default' }])

  const handleSearchInput = (input, field) => {
    const newInputs = [...selectedQueries];
    newInputs[0][field] = input
    setSelectedQueries(newInputs);
  }

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
        setExamQuery(search_options.exam_type);
        setIsQueryLoaded(true);
      })

  }, [])

  const handleSearchQuery = () => {
    setShowLoading(true)
    const isAllSelected = Object.values(selectedQueries[0]).every((value) => value != 'default')
    const errorTag = document.getElementById('error-missing-queries');

    if (isAllSelected) {
      errorTag.style.display = 'none';

      fetch(`${import.meta.env.VITE_API_URL}/fetch/exam/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search_queries: selectedQueries })
      })
        .then((res) => { return res.json() })
        .then((data) => {

          if (data.result == null) {
            setShowLoading(false)
            return setIsNoResult(true)
          }
          setIsNoResult(false);
          setSearchResult(data.result)
          setTableHeader(data.header)
          setIsSearchCompleted(true)
          setShowLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setShowLoading(false)
        })
    }
    else {
      errorTag.style.display = "block";
      setShowLoading(false)
    }

  }


  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
      <div className='h-full pt-24 md:ml-96'>
        <PageHeader title='Exam Management' enablePath={true} rootPath='Management' subPath='Exam Management' />
        {isQueryLoaded ? (
          <div className='mt-10 w-full h-full'>
            <div className='w-full flex flex-wrap'>
              <div className='flex flex-wrap'>
                <div className='w-52 mt-5 mr-2'>
                  <div className="relative">
                    <select
                      className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                      name="example"
                      onChange={(e) => handleSearchInput(e.target.value, 'department')}
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
                      onChange={(e) => handleSearchInput(e.target.value, 'batch')}
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
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className='w-52 ml-2 mt-5 mr-2'>
                  <div className="relative flex items-center">
                    <select
                      className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                      name="example"
                      onChange={(e) => handleSearchInput(e.target.value, 'academic_year')}
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
                  </div>
                </div>
                <div className='w-52 ml-2 mt-5 mr-2'>
                  <div className="relative flex items-center">
                    <select
                      className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                      name="example"
                      onChange={(e) => handleSearchInput(e.target.value, 'semester')}
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
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-52 ml-2 mt-5 mr-2'>
                  <div className="relative flex items-center">
                    <select
                      className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                      name="example"
                      onChange={(e) => handleSearchInput(e.target.value, 'exam_type')}
                    >
                      <option value='default'>Exam Type</option>
                      {
                        examQuery.map((item, i) => (
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
              <div className='w-full ml-2 mt-5 mr-2 flex justify-end'>
                <div className="relative">
                  <button className='bg-[#4285F4] font-inter text-xs text-white py-3 pl-4 pr-5 rounded-sm' onClick={handleSearchQuery}><span><FontAwesomeIcon icon={faEye} className='mr-2' />Show Result</span>
                  </button>
                </div>
              </div>
            </div>

            <p className='text-red-500 ml-2 mt-5 font-inter text-xs' id='error-missing-queries' style={{ display: 'none' }}>* Select all required options</p>

            <div className='w-full flex flex-col items-center mt-10'>
              {
                showLoading ? (
                  <span className='text-center font-inter text-slate-600 animate-pulse'><FontAwesomeIcon className='text-xs mx-2' icon={faMagnifyingGlass}/> Searching results...</span>
                ) : (
                  <></>
                )
              }

              {
                isNoResult ? <><p className='text-slate-600 font-poppins text-sm'>No results...</p></> : <></>
              }

            </div>
            {isSearchCompleted && !isNoResult ? (

              <div className='max-w-full ml-2 mt-10 overflow-x-auto pr-5'>
                <table className='w-full table-auto overflow-scroll '>
                  <thead>
                    <tr className='text-slate-500 border-2'>
                      <th className='font-normal font-inter py-4 px-3 text-sm text-start'>Register Number <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
                      <th className='font-normal font-inter py-4 px-3 text-sm text-start'>Name <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
                      {tableHeader.map((item, i) => (
                        <th className='font-normal font-inter py-4 px-3 text-sm text-start' key={i}>{item} <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
                      ))}
                      <th className='font-normal font-inter py-4 px-3 text-sm text-start'>Action <FontAwesomeIcon className='font-regular cursor-pointer text-xs' icon={faSort} /></th>
                    </tr>
                  </thead>
                  <tbody className='text-center bg-white'>

                    {searchResult.map((item, i) => (
                      <tr className='font-inter border' key={i}>
                        <td className='text-gray-400 px-3 py-3 text-sm text-start'>{item.roll_no}</td>
                        <td className='text-gray-400 px-3 py-3 text-sm text-start'>{item.name}</td>
                        {
                          tableHeader.map((subject, i) => (
                            <td className='text-gray-400 px-3 py-3 text-sm text-start' key={i}>{item[subject]}</td>
                          ))
                        }
                        <td className='text-gray-400 px-3 py-3 text-sm text-start'><a className='text-blue-500 cursor-pointer'>Update</a></td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            ) : <></>}
          </div>
        ) : (
          <div className='w-full h-screen pt-20 flex justify-center'>
            <p className='text-slate-400'><FontAwesomeIcon icon={faSpinner} className='text-slate-400 animate-spin text-sm' /> Loading</p>
          </div>
        )}
      </div>
    </div>
  )
}

const TableOfResult = (props) => {
  return (
    <>
    </>
  )
}
