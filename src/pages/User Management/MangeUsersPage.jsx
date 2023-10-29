import React, { useLayoutEffect, useState } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { Table } from '../../components/Table'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const MangeUsersPage = () => {
  const [header, setHeader] = useState(['Name', 'Email', 'Role']);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
    console.log('entered into fetching');
    fetch(`${import.meta.env.VITE_API_URL}/fetch/users/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => { return res.json() })
      .then((data) => {
        setUsers(data.users)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }, [])
  return (
    <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
      <div className='h-full pt-24 md:ml-96'>
        <PageHeader title='Users Management' enablePath={true} rootPath='Users Management' subPath='Manage Users' />

        <div className='mt-10'>
          <div className='w-full flex justify-end my-3'>
            <Link to={'add'} className='bg-green-600 px-5 py-2 font-medium text-sm rounded-md text-white'>Add User</Link>
          </div>
          <div className='w-full flex flex-col items-center mt-10'>
            {
              isLoading ? (
                <span className='text-center font-inter text-slate-600 animate-pulse'><FontAwesomeIcon className='text-xs mx-2' icon={faMagnifyingGlass} /> Fetching results...</span>
              ) : (
                <>
                  <Table header={header} data={users} enableRowAction={true} renderRowAction={({ row }) => (
                    <Link to={`/manage/${row.Name}`} className='text-sm text-blue-400'>Manage</Link>
                  )} />
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}
