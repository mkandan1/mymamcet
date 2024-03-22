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
import { isDataModified } from '../../services/isDataModified'
import { LogPopupModel } from '../../components/LogPopupModel'

export const EditCourses = () => {
    const [courseName, setCourseName] = useState('');
    const [regulation, setRegulation] = useState('');
    const [department, setDepartment] = useState('');
    const [program, setProgram] = useState('');
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [regulations, setRegulations] = useState([]);
    const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [fetchedData, setFetched] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!courseName || !regulation || !department || !program) {
            dispatch(showNotification({ type: "error", message: "Please fill all fields before submitting" }));
            setLoading({ state: false, buttonId: "save" })
            return;
        }

        const data = { courseName: courseName, regulation: regulation.value, department: department, program: program, };

        if (!isDataModified(data, fetchedData)) {
            dispatch(showNotification({ type: "error", message: "No changes were found" }))
            return;
        }

        const result = await CourseServices.editCourse({ ...data, _id: fetchedData._id });

        if (result.success) {
            return dispatch(showNotification({ type: "success", message: result.message }));
        } else {
            return dispatch(showNotification({ type: "error", message: result.message }));
        }
    };

    const handleDelete = () => {
        if (!fetchedData._id) {
            return dispatch(showNotification({ type: "error", message: "Course ID doesn't exist" }))
        }

        CourseServices.deleteCourse(fetchedData._id).then((data) => {
            setLoading({ state: false, buttonId: "delete" })
            dispatch(showNotification({ type: "success", message: data.message }))
            navigate('/web/courses/all')
        }).catch((err) => {
            setLoading({ state: false, buttonId: "delete" })
            dispatch(showNotification({ type: "error", message: err.message }))
        })
    }


    useEffect(() => {
        const query = [{ collectionName: 'courses', fields: ['courseName', 'regulation'] }]
        Queries.getQueries(query).then((data) => {
            const regulation = data.queries.optionregulation;
            setRegulations(regulation)
        }).catch((err) => console.log(err))

        const paths = new URL(window.location).pathname;
        const arrayOfPaths = paths.split('/');
        const courseId = arrayOfPaths[arrayOfPaths.length - 1];
        CourseServices.getCourseDetails(courseId).then((data) => {
            setFetched(data.course)
            setProgram(data.course.program)
            setDepartment(data.course.department);
            setCourseName(data.course.courseName);
            setRegulation({ label: data.course.regulation, value: data.course.regulation })
        })
    }, [refresh])


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
                <LogPopupModel show={show} data={fetchedData} rows={'10'} onClose={() => setShow(false)} handleRefresh={() => setRefresh((prev) => !prev)} />
                <ButtonLayout>
                    <Button bgColor={'gray'} textColor={'gray-500'} text={'View changes log'} icon={'pajamas:log'} onClick={() => { setShow(true); }} />
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Save Changes'} icon={'material-symbols:save-outline'} onClick={() => handleSubmit()} />
                    <Button bgColor={'red-500'} textColor={'white'} text={'Delete'} icon={'material-symbols:delete-outline'} onClick={() => handleDelete()} />
                    <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'ic:outline-cancel'} onClick={() => navigate('/web/courses/all')} />
                </ButtonLayout>
            </FormLayout>
        </Layout>
    );
};
