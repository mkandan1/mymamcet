import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CourseServices } from '../../apis/course/course';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { LayoutHeader } from '../../components/LayoutHeader';
import { FormLayout } from '../../components/FormLayout';
import { InputLayout } from '../../components/InputLayout';
import { Input } from '../../components/Input';
import { ButtonLayout } from '../../components/ButtonLayout';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { CustomCreateSelect } from '../../components/CustomSelect';
import { Queries } from '../../apis/queries/queries';

export const NewCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [regulation, setRegulation] = useState('');
  const [department, setDepartment] = useState('');
  const [program, setProgram] = useState('');
  const [regulations, setRegulations] = useState([]);
  const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
  const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {

    if (!courseName || !regulation || !department || !program) {
      console.log(courseName);
      dispatch(showNotification({ type: "error", message: "Please fill all fields before submitting" }))
      return;
    }

    const data = { courseName: courseName, regulation: regulation.value, department: department, program: program };

    console.log(data);

    const result = await CourseServices.addNewCourse(data);

    if (result.success) {
      return dispatch(showNotification({ type: "success", message: result.message }));
    } else {
      return dispatch(showNotification({ type: "error", message: result.message }));
    }
  };

  useEffect(() => {
    const query = [{ collectionName: 'courses', fields: ['courseName', 'regulation'] }]
    Queries.getQueries(query).then((data) => {
      const regulation = data.queries.optionregulation;
      setRegulations(regulation)
    }).catch((err) => console.log(err))
  }, [])


  return (
    <Layout>
      <LayoutHeader title={'New Course'} />

      <FormLayout rows={'8'} cols={'12'}>
        <InputLayout rows={'3'} cols={'12'}>
          <Select
            label={'Program'}
            value={program}
            options={programs}
            placeholder={'Select Program'}
            onChange={(option) => setProgram(option)}
            rowStart={'1'}
            colStart={'1'}
          />
          <Select
            label={'Department'}
            value={department}
            options={departments}
            placeholder={'Select Department'}
            onChange={(option) => setDepartment(option)}
            rowStart={'2'}
            colStart={'1'}
          />

          <Input
            type={'text'}
            label={'Course Name'}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            rowStart={'3'}
            colStart={'1'}
            inputColSize={'3'}
          />
          <CustomCreateSelect
            label={'Regulation'}
            value={regulation}
            options={regulations}
            onChange={(e) => setRegulation(e)}
            rowStart={'1'}
            colStart={'2'}
          />
        </InputLayout>
        <ButtonLayout>
          <Button bgColor={'blue-500'} textColor={'white'} text={'Save & Create'} icon={'material-symbols:save-outline'} onClick={()=>handleSubmit()} />
          <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'ic:outline-cancel'} onClick={() => navigate('/web/courses/all')} />
        </ButtonLayout>
      </FormLayout>

      {/* <div className='row-span-4 h-full col-span-12 grid grid-cols-12 grid-rows-4 bg-white mx-4 p-5 border'>
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
      </div> */}
    </Layout>
  );
};
