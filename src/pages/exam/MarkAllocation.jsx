import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { LayoutHeader } from '../../components/LayoutHeader'
import { FormLayout } from '../../components/FormLayout'
import { SectionLayout } from '../../components/SectionLayout'
import { InputLayout } from '../../components/InputLayout'
import { Select } from '../../components/Select'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchQueries } from '../../apis/subject/subjectMapping'
import { showNotification } from '../../redux/actions/notification'
import { generateAcademicYears, mapAcademicYearToSemesters } from '../../services/academicYear'
import { getRegulation } from '../../apis/queries/queries'
import { ButtonLayout } from '../../components/ButtonLayout'
import { Button } from '../../components/Button'
import { Table } from '../../components/Table'
// import { semester } from '../../apis/batch/batch'

export const MarkAllocation = () => {
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [departments, setDepartments] = useState(['IT', 'CSE', 'EEE', 'ECE', 'CIVIL', 'MECH']);
    const [batchNames, setBatchNames] = useState(['No batches found']);
    const [academicYears, setAcademicYears] = useState(['No academic years']);
    const [semesters, setSemesters] = useState([['No semesters']]);
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState(['CIA 1', 'CIA 2', 'Model', 'University'])
    const [subjects, setSubjects] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [allBatches, setAllBatches] = useState();
    const [batch, setBatch] = useState({
        program: '',
        department: '',
        batchName: '',
        academicYear: '',
        semester: '',
        exam: ''
    })
    const headers = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Category', field: 'category' },
    ];


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [])


    return (
        <Layout>
            <LayoutHeader title={'Mark Allocation'} />
            <FormLayout rows={'8'} cols={'12'}>
                <SectionLayout title={'Batch Information'} />
                <InputLayout rows={'3'} cols={'12'}>
                    <Select
                        label={'Program'}
                        placeholder={'Select Program'}
                        value={batch.program}
                        onChange={(option) => setBatch((prev) => ({ ...prev, program: option }))}
                        options={programs}
                        rowStart={1}
                        colStart={1}
                    />
                    <Select
                        label={'Department'}
                        placeholder={'Select Department'}
                        value={batch.department}
                        onChange={(option) => setBatch((prev) => ({ ...prev, department: option }))}
                        options={departments}
                        rowStart={2}
                        colStart={1}
                    />
                    <Select
                        label={'Batch'}
                        placeholder={'Select Batch'}
                        value={batch.batchName}
                        onChange={(option) => setBatch((prev) => ({ ...prev, batchName: option }))}
                        options={batchNames}
                        rowStart={3}
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
                        placeholder={'Select Exam Type'}
                        value={batch.exam}
                        options={exams}
                        label={'Semester'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, exam: option }))}
                        rowStart={3}
                        colStart={6}
                    />
                </InputLayout>
                <SectionLayout title={'Students'}>
                    <ButtonLayout marginTop={'0'}>
                        <Button bgColor={'blue-500'} textColor={'white'} text={'Get students'} icon={'ph:student-light'} />
                        <Button bgColor={'green-500'} textColor={'white'} text={'Enter Marks'} icon={'uil:edit'} />
                        <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'ic:outline-cancel'} onClick={() => window.history.back()} />
                    </ButtonLayout>
                </SectionLayout>
                <Table headers={headers} data={students} />
            </FormLayout>
        </Layout>
    )
}
