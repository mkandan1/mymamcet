import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Table } from '../../components/Table';
import { Link } from 'react-router-dom';

export const SubjectsPage = () => {
  const [headers, setHeader] = useState(["Subject Code", "Subject Name", "Credits"])
  const [isNoResult, setIsNoResult] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    // setIsSearchCompleted(!isSearchCompleted)
  }, [])
  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
      <div className='h-full pt-24 md:ml-96'>
        <div className='flex justify-between'>
          <PageHeader title="Subjects" enablePath={false}/>
          <div className='h-8'>
            <Link to='/main/subjects/subject/add' className='ml-2 text-sm bg-green-500 font-poppins text-white px-5 py-2 tracking-tight'><FontAwesomeIcon icon={faAdd} className='mr-3' />New Subject</Link>
          </div>
        </div>

        <div className='w-full flex flex-col items-center mt-10'>
          {
            !isSearchCompleted ? (
              <span className='text-center font-inter text-slate-600 animate-pulse'><FontAwesomeIcon className='text-xs mx-2' icon={faMagnifyingGlass} /> Searching results...</span>
            ) : (
              <></>
            )
          }

          {
            isNoResult ? <><p className='text-slate-600 font-poppins text-sm'>No results...</p></> : <></>
          }

          {isSearchCompleted && !isNoResult ? (

            <div className='max-w-full ml-2 mt-10 overflow-x-auto pr-5'>
              <Table header={header} data={searchResult} enableRowAction={true} renderRowAction={({ row }) => (
                <Link className='text-blue-500 text-sm font-inter' to={`/main/batch/details?department=${row['Department']}&batch=${row['Batch']}`}>Manage</Link>
              )} />
            </div>
          ) : <></>}
        </div>
      </div>
    </div>
  )
}
