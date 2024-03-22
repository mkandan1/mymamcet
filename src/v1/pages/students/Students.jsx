import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
// import { getAllStudents } from '../../apis/student/student';
import { Table } from '../../components/Table';
import { LoadingState } from '../../components/LoadingState'
import { StudentService } from '../../apis/student/student';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';

export const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [view, setView] = useState();

  useEffect(() => {
    StudentService.getAllStudents()
      .then((data)=> {
        setData(data.students)
      })
      .catch((err)=> dispatch(showNotification({type: "error", message: err.response.data.message})))
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
    { label: 'Register Number', field: 'registerNumber' },
    { label: 'Name', field: 'name' },
    { label: 'Date Of Birth', field: 'dob' },
    { label: 'Phone', field: 'phone' },
    { label: 'Father\'s name', field: 'fathersName' },
    { label: 'Mother\'s name', field: 'mothersName' },
    { label: 'Address', field: 'address' },
    { label: '10th Mark', field: '_10thMark' },
    { label: '12th Mark', field: '_12thMark' },
];

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All Students</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-2' placeholder='Type student name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>Search</button>
        </div>
      </div>
      <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8 px-4'>
        <LoadingState rows={8} cols={12}>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            <Table headers={headers} data={filteredData} onViewRow={(id) => handleView(id)} view={view}/>
          ) : (
            <p className='row-span-1 row-start-2 col-span-12 flex justify-center  items-center gap-2 mt-20'>
              <Icon icon={'mdi:question-mark-box'} />
              No data available</p>
          )}
        </LoadingState>
      </div>
    </Layout>
  );
};
