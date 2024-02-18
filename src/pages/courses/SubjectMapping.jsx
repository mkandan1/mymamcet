import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { LayoutHeader } from '../../components/LayoutHeader'
import { FormLayout } from '../../components/FormLayout'
import { InputLayout } from '../../components/InputLayout'
import { SectionLayout } from '../../components/SectionLayout'
import { Select } from '../../components/Select'
import { ButtonLayout } from '../../components/ButtonLayout'
import { Button } from '../../components/Button'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../redux/actions/notification'
import { SubjectMappingServices } from '../../apis/subject/subjectMapping'
import { generateAcademicYears, mapAcademicYearToSemesters } from '../../services/academicYear'
import { PopupModel } from '../../components/PopupModel'
import { SubjectServices } from '../../apis/subject/subject'
import { TableLayout } from '../../components/TableLayout'
import { Table } from '../../components/Table'
import { useNavigate } from 'react-router-dom';
import { CustomCreateSelect } from '../../components/CustomSelect'
import { Queries } from '../../apis/queries/queries'

export const SubjectMapping = () => {
    const [batch, setBatch] = useState({
        program: '',
        department: '',
        courseName: '',
        batchName: '',
        academicYear: '',
        semester: '',
        regulation: ''
    })
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [departments, setDepartments] = useState(['IT', 'CSE', 'EEE', 'ECE', 'CIVIL', 'MECH']);
    const [batchNames, setBatchNames] = useState(['No batches found']);
    const [courseNames, setCourseNames] = useState(['No courses found']);
    const [academicYears, setAcademicYears] = useState(['No academic years']);
    const [semesters, setSemesters] = useState([['No semesters']]);
    const [subjects, setSubjects] = useState();
    const [regulations, setRegulations] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [allBatches, setAllBatches] = useState();
    const [faculties, setFaculties] = useState([]);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headers = [
        { label: 'Subject Code', field: 'subjectCode' },
        { label: 'Subject Name', field: 'subjectName' },
        { label: 'Department', field: 'department' },
        { label: 'Program', field: 'program' },
        { label: 'Faculty', field: 'faculty' },
    ];

    const handleSelectedSubjects = (data) => {
        const selectedSubjectsArray = subjects.filter((subject) => data.includes(subject._id));
        setSelectedSubjects(selectedSubjectsArray)
        setShow(false);
    }

    const handleSave = async () => {
        const isEmpty = Object.values(batch).every(value => value == '');
        if (isEmpty) {
            dispatch(showNotification({ type: 'error', message: "Please fill all fields before submitting" }))
            return
        }
        const arrayOfSubjectIds = selectedSubjects.map((subject) => subject._id);
        const data = { ...batch, subjects: arrayOfSubjectIds }

        SubjectMappingServices.addSemester(data)
            .then((snapshot) => {
                dispatch(showNotification({ type: "success", message: snapshot.message }))
            })
            .catch((err) => {
                dispatch(showNotification({ type: "error", message: err.response.data.message }))
            })

    }

    useEffect(() => {
        Queries.getCourse()
            .then((data) => { setCourseNames(data.queries.courseName) })
            .catch((err) => dispatch(showNotification({ type: "error", message: err.message })))
    }, []);

    useEffect(() => {
        if (batch.courseName) {
            const queries = [{ collectionName: "batches", values: [{ program: batch.program, department: batch.department, courseName: batch.courseName }], responseData: ["batchName"] }]
            Queries.getDocuments(queries)
                .then((data) => {
                    setBatchNames(data.options.batchName)
                }).catch((err) => dispatch(showNotification({ type: "error", message: err.response.data.message })))
            const facultyQueries = [{collectionName: 'users', fields: ['firstName']}]
            Queries.getQueries(facultyQueries)
                .then((snapshot)=> console.log(snapshot))
                .catch((err)=> console.error(err))
        }
    }, [batch.courseName])

    useEffect(() => {
        const academicYears = generateAcademicYears(batch.batchName);
        setAcademicYears(academicYears)
    }, [batch.batchName])

    useEffect(() => {
        const semesters = mapAcademicYearToSemesters(batch.batchName, batch.academicYear);
        setSemesters(semesters)
    }, [batch.academicYear])

    useEffect(() => {
        if (batch.semester) {
            const query = [{ collectionName: "courses", fields: ["regulation"] }]
            Queries.getQueries(query)
                .then((data) => { setRegulations(data.queries.regulation) })
                .catch((err) => dispatch(showNotification({ type: "error", message: err.message })))
        }
    }, [batch.semester])

    useEffect(() => {
        if (batch.regulation) {
            SubjectServices.getAllSubjects()
                .then((data) => { setSubjects(data.subjects) })
                .catch((err) => dispatch(showNotification({ type: "error", message: err.message })))
        }
    }, [batch.regulation])

    return (
        <Layout>
            <LayoutHeader title={'Subject Mapping'} />
            <PopupModel show={show} title={'All Subjects'} rows={5} cols={12} data={subjects} header={headers} onClose={() => setShow(false)} onSelectedRows={(data) => handleSelectedSubjects(data)} />
            <FormLayout rows={8} cols={12}>
                <SectionLayout title={'Batch'} />
                <InputLayout rows={4} cols={12}>
                    <Select
                        placeholder={'Select Program'}
                        value={batch.program}
                        options={programs}
                        label={'Program'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, program: option }))}
                        rowStart={1}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Department'}
                        value={batch.department}
                        options={departments}
                        label={'Department'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, department: option }))}
                        rowStart={2}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Course'}
                        value={batch.courseName}
                        options={courseNames}
                        label={'Course'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, courseName: option }))}
                        rowStart={3}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Batch'}
                        value={batch.batchName}
                        options={batchNames}
                        label={'Batch'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, batchName: option }))}
                        rowStart={4}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Academic Year'}
                        value={batch.academicYear}
                        options={academicYears}
                        label={'Academic Year'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, academicYear: option }))}
                        rowStart={1}
                        colStart={6}
                    />
                    <Select
                        placeholder={'Select Semester'}
                        value={batch.semester}
                        options={semesters}
                        label={'Semester'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, semester: option }))}
                        rowStart={2}
                        colStart={6}
                    />
                    <Select
                        placeholder={'Select Regulation'}
                        value={batch.regulation}
                        options={regulations}
                        label={'Regulation'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, regulation: option }))}
                    />
                </InputLayout>
                <SectionLayout title={'Subjects list'}>
                    <ButtonLayout cols={5} marginTop={'0'}>
                        <Button bgColor={'blue-500'} textColor={'white'} text={'Add subject'} icon={'uil:plus'} onClick={() => setShow(true)} />
                        <Button bgColor={'green-500'} textColor={'white'} text={'Save'} icon={'uil:save'} onClick={() => handleSave()} />
                        <Button bgColor={'white'} textColor={'gray-500'} text={'Close'} icon={'carbon:close-outline'} onClick={() => navigate('/web/courses/batches')} />
                    </ButtonLayout>
                </SectionLayout>
                <Table headers={headers} data={selectedSubjects} isFaculty />
            </FormLayout>
        </Layout>
    )
}
