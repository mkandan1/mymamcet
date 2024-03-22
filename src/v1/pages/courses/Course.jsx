import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CourseServices } from '../../apis/course/course'
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { LoadingState } from '../../components/LoadingState';
import { Button } from '../../components/Button'
import { ButtonLayout } from '../../components/ButtonLayout'

export const Course = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [view, setView] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    CourseServices.getAllCourse().then((data) => {
      console.log(data);
      setData(data.courses)
      setIsLoading(false)
    }).catch((err) => {
      dispatch(showNotification({ type: "error", message: err.message }))
      setIsLoading(false)
    })
  }, []);


  useEffect(() => {
    setFilteredData(
      data.filter(course => course.courseName.toLowerCase().includes(query.toLowerCase()))
    );
  }, [data, query]);

  const handleView = (id) => {
    setView(id);
  }

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All courses</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <ButtonLayout>
          <Button bgColor={'green-500'} textColor={'white'} text={'Create'} icon={'oui:plus'} onClick={()=> navigate('/web/courses/course/new')}/>
          <Button textColor={'white'} bgColor={'blue-500'} text={'Edit'} icon={'bx:edit'} onClick={()=> view &&(navigate('/web/courses/course/'+view))}/>
        </ButtonLayout>
        <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          {/* <span className='flex items-center gap-x-2 text-gray-600 cursor-pointer'>Filter by <Icon icon={'ion:filter-sharp'} /></span> */}
          {/* <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-2' placeholder='Type course name...' value={query} onChange={(e) => setQuery(e.target.value)} /> */}
        </div>
      </div>
      <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8'>
        <LoadingState isLoading={isLoading} rows={'8'} cols={'12'}>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((course) => (
              <div key={course._id} className={`col-span-4 row-span-4 grid grid-cols-4 p-5 m-5 gap-2 bg-white border text-gray-800 cursor-pointer ${view == course._id ? 'border-blue-500' : 'border border-gray-300'}`} onClick={() => handleView(course._id)}>
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
            <p className='row-span-1 row-start-2 col-span-12 flex justify-center  items-center gap-2 mt-20'>
              <Icon icon={'mdi:question-mark-box'} />
              No data available</p>
          )
          }
        </LoadingState>
      </div>
    </Layout>
  );
};
