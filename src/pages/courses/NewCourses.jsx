import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { addNewCourse } from '../../apis/course/course';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';

export const NewCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [regulation, setRegulation] = useState('');
  const [department, setDepartment] = useState('');
  const [program, setProgram] = useState('');
  const [regulations, setRegulations] = useState(['R 21', 'R 17']);
  const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
  const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
  
    if (!courseName || !regulation || !department) {
      console.log('Please fill in all fields before submitting.');
      return;
    }
  
    const data = { courseName: courseName, regulation: regulation, department: department, program: program };
  
    const result = await addNewCourse(data);
  
    if (result.success) {
      return dispatch(showNotification({ type: "success", message: result.message }));
    } else {
      return dispatch(showNotification({ type: "error", message: result.message }));
    }
  };
  

  return (
    <Layout>
      <div className='row-span-1 row-start-1 col-span-12 px-4 flex items-center bg-fuchsia-600 mx-4 mt-4'>
        <h3 className='text-lg font-manrope text-white'>New Course</h3>
      </div>

      <div className='row-span-4 h-full col-span-12 grid grid-cols-12 grid-rows-4 bg-white mx-4 p-5 border'>
        <div className='row-span-1 row-start-1 col-span-12 grid grid-cols-12 grid-rows-1 gap-x-4'>
          <div className='row-span-1 col-span-3 grid-cols-3'>
            <label className='text-gray-600 font-medium'>Course Name</label>
            <input
              type='text'
              id='courseName'
              name='courseName'
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className='bg-white border w-full text-sm'
            />
          </div>
          <div className='row-span-1 col-span-3 grid-cols-3'>
            <label className='text-gray-600 font-medium'>Regulation</label>
            <select
              value={regulation}
              onChange={(e) => setRegulation(e.target.value)}
              className='w-full text-sm border bg-white h-[42px] outline-none font-manrope px-2 text-gray-500'
            >
              <option value=''>Select Regulation</option>
              { regulations.map((reg, i)=>(
                <option key={i} value={reg}>{reg}</option>
              ))}
            </select>
          </div>
          <div className='row-span-1 col-span-3 grid-cols-3'>
            <label className='text-gray-600 font-medium'>Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className='w-full text-sm border bg-white h-[42px] outline-none font-manrope px-2 text-gray-500'
            >
              <option value=''>Select Department</option>
              {
                departments.map((dep, i)=> (
                  <option key={i} value={dep}>{dep}</option>
                ))
              }
            </select>
          </div>
          <div className='row-span-1 col-span-3 grid-cols-3'>
            <label className='text-gray-600 font-medium'>Program</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className='w-full text-sm border bg-white h-[42px] outline-none font-manrope px-2 text-gray-500'
            >
              <option value=''>Select Program</option>
              {
                programs.map((pro, i)=> (
                  <option key={i} value={pro}>{pro}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='row-span-1 row-start-3 col-span-12 grid grid-cols-10 grid-rows-1 gap-x-4'>
          <div className='col-span-4 flex gap-2'>
            <button
              onClick={handleSubmit}
              className='flex items-center gap-2 text-xs outline font-manrope w-auto text-white px-2 bg-blue-500'
            >
              <Icon icon={'material-symbols:save-outline'} className='text-white text-lg'></Icon>
              Save & Create
            </button>
            <button
              onClick={()=> {navigate('/web/courses/all')}}
              className='flex items-center gap-2 text-xs border font-manrope w-auto text-gray-800 px-7 bg-white'
            >
              Cancel
            </button>
          </div>
        </div>
        <div className='row-span-1'></div>
      </div>
    </Layout>
  );
};
