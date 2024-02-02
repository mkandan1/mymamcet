import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { getAllCourse } from '../../apis/course/course';
import { Table } from '../../components/Table';

export const Course = () => {
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
        const result = await getAllCourse();
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
      data.filter(course => course.courseName.toLowerCase().includes(query.toLowerCase()))
    );
    console.log(data);
  }, [data, query]);

  const handleView = (id)=>{
    setView(id);
    console.log(view);
  }

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All courses</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <button className='bg-green-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider h-[32px]' onClick={() => { navigate('/web/courses/course/new') }}>New</button>
        <button className='bg-blue-500 row-span-1 text-white font-normal font-manrope text-sm tracking-wider ml-2 h-[32px]' onClick={() => { navigate(`/web/courses/course/${view}`) }}>View</button>
        <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          {/* <span className='flex items-center gap-x-2 text-gray-600 cursor-pointer'>Filter by <Icon icon={'ion:filter-sharp'} /></span> */}
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-2' placeholder='Type course name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>search</button>
        </div>
      </div>
      <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8'>
        {isLoading ? (
          <div>
            <Icon icon={'eos-icons:three-dots-loading'} className='text-5xl'></Icon>
          </div>
        ) : (
          Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((course) => (
              <div key={course._id} className={`col-span-4 row-span-4 grid grid-cols-4 p-5 m-5 gap-2 bg-white border text-gray-800 cursor-pointer ${view == course._id ? 'border-blue-500': 'border border-gray-300'}`} onClick={()=>handleView(course._id)}>
                <p className='row-span-1 col-span-4 text-blue-950 font-manrope font-semibold text-md'>{course.courseName}</p>
                <div className='col-span-2 gap-2'>
                  <p className='row-span-1 mt-2 text-gray-500'><span className='font-sen'>Regulation</span></p>
                  <p className='row-span-1 mt-2 text-gray-500'><span className='font-sen'>Department</span></p>
                  <p className='row-span-1 mt-2 text-gray-500'><span className='font-sen'>Program</span></p>
                </div>
                <div className='col-span-2 gap-2'>
                  <p className='row-span-1 mt-2'><span className='font-sen'>{course.regulation}</span></p>
                  <p className='row-span-1 mt-2'><span className='font-sen'>{course.department}</span></p>
                  <p className='row-span-1 mt-2'><span className='font-sen'>{course.program}</span></p>
                </div>
              </div>
            ))
          ) : (
            <p className='row-span-1 row-start-2 col-span-12 text-center'>No data available</p>
          )
        )}
      </div>
    </Layout>
  );
};
