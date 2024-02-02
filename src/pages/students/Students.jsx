import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
// import { getAllStudents } from '../../apis/student/student';
import { Table } from '../../components/Table';

export const Students = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [view, setView] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // const result = await getAllStudents();
        if (result.success) {
          setData(result.data);
          setFilteredData(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredData when the query changes
    setFilteredData(
      data.filter(student => student.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [data, query]);

  const handleView = (id) => {
    setView(id);
  };

  const headers = [
    { label: 'Name', field: 'name' },
    { label: 'Register Number', field: 'registerNumber' },
    { label: 'Batch', field: 'batch' },
    { label: 'Regulation', field: 'regulation' },
    { label: 'Course', field: 'course' },
  ];

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All Students</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <button className='bg-green-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider h-[32px]' onClick={() => { navigate('/web/students/student/new') }}>New</button>
        <button className='bg-blue-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider ml-2 h-[32px]' onClick={() => { navigate(`/web/students/student/${view}`) }}>View</button>
        <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-2' placeholder='Type student name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>Search</button>
        </div>
      </div>
      <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8'>
        {isLoading ? (
          <div>
            <Icon icon={'eos-icons:three-dots-loading'} className='text-5xl'></Icon>
          </div>
        ) : (
          Array.isArray(filteredData) && filteredData.length > 0 ? (
            <Table headers={headers} data={filteredData} onViewRow={(id) => handleView(id)} view={view} />
          ) : (
            <p className='row-span-1 row-start-2 col-span-12 text-center'>No data available</p>
          )
        )}
      </div>
    </Layout>
  );
};
