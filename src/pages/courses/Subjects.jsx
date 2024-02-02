import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects } from '../../apis/subject/subject';
import { Icon } from '@iconify/react';
import {Table} from '../../components/Table';

export const Subjects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [view, setView] = useState();
  const headers = [
    { label: 'Subject Code', field: 'subjectCode' },
    { label: 'Subject Name', field: 'subjectName' },
    { label: 'Department', field: 'department' },
    { label: 'Regulation', field: 'regulation' },
    { label: 'Program', field: 'program' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAllSubjects();
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
    setFilteredData(
      data.filter(
        (subject) =>
          subject.subjectName.toLowerCase().includes(query.toLowerCase()) ||
          subject.subjectCode.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [data, query]);

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All subjects</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <button className='bg-green-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider h-[32px]' onClick={() => { navigate('/web/courses/subjects/subject/new') }}>New</button>
        <button className='bg-blue-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider ml-2 h-[32px]' onClick={() => { navigate(`/web/courses/subjects/subject/${view}`) }}>View</button>
        <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-3' placeholder='Type subject name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          {/* <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>Search</button> */}
        </div>
      </div>
      <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8 px-4'>
        {isLoading ? (
          <div>
            <Icon icon={'eos-icons:three-dots-loading'} className='text-5xl'></Icon>
          </div>
        ) : (
          <Table headers={headers} data={filteredData} onViewRow={(id)=> setView(id)} view={view}/>
        )}
      </div>
    </Layout>
  );
};
