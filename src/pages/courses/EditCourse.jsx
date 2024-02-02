import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { addNewCourse, deleteCourse, editCourseDetails, getCourseDetails } from '../../apis/course/course';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';

export const EditCourses = () => {
    const [courseName, setCourseName] = useState('');
    const [regulation, setRegulation] = useState('');
    const [department, setDepartment] = useState('');
    const [program, setProgram] = useState('');
    const [course, setCourse] = useState();
    const [regulations, setRegulations] = useState(['R 21', 'R 17']);
    const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const pathname = new URL(window.location).pathname;
            const arrayOfPath = pathname.split('/');
            const courseId = arrayOfPath[arrayOfPath.length - 1];
            const result = await getCourseDetails(courseId);
            if (result.success) {
                const course = result.data[0];
                setCourse(course);
                setCourseName(course.courseName);
                setRegulation(course.regulation);
                setDepartment(course.department);
                setProgram(course.program)
            }
        }

        fetchData();
    }, [])

    const isDataModified = () => {
        return (
            courseName !== course.courseName ||
            regulation !== course.regulation ||
            department !== course.department ||
            program !== course.program
        )
    }

    const handleDeleteCourse = async () => {
        const result = await deleteCourse(course._id);
        if(result.success){
            dispatch(showNotification({type: "success", message: result.message}))
            return setTimeout(()=> {
                navigate('/web/courses/all');
            },3000)
        }
        else{
            return dispatch(showNotification({type: "error", message: "Error while deleting course"}));
        }
    }

    const handleSubmit = async () => {
        const isModified = isDataModified();
        if (!isModified) {
            dispatch(showNotification({ type: "error", message: "No chnages were found" }))
            return;
        }

        const data = { _id: course._id, courseName: courseName, regulation: regulation, department: department, program: program };

        const result = await editCourseDetails(data);

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
                            {regulations.map((reg, i) => (
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
                                departments.map((dep, i) => (
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
                                programs.map((pro, i) => (
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
                            onClick={handleDeleteCourse}
                            className='flex items-center gap-2 text-xs border font-manrope w-auto text-white px-7 bg-red-500'
                        >
                            <Icon icon={'material-symbols:delete-outline'} className='text-lg text-white'></Icon>
                            Delete
                        </button>
                        <button
                            onClick={() => { navigate('/web/courses/all') }}
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
