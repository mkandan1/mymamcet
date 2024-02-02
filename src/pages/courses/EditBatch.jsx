import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { Table } from '../../components/Table';
import { CustomCreateSelect } from '../../components/CustomSelect'
import * as XLSX from 'xlsx';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { addBatch, getBatchDetails, getQueries, updateBatchDetails } from '../../apis/batch/batch';
import { LayoutHeader } from '../../components/LayoutHeader';
import { FormLayout } from '../../components/FormLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { ButtonLayout } from '../../components/ButtonLayout';
import { TableLayout } from '../../components/TableLayout';
import { Button } from '../../components/Button';
import { FileInput } from '../../components/FileInput';

export const EditBatch = () => {
    const [batchName, setBatchName] = useState('');
    const [semester, setSemester] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [department, setDepartment] = useState('');
    const [courseName, setCourseName] = useState('');
    const [regulation, setRegulation] = useState('');
    const [fetchedBatch, setFetchedBatch] = useState();
    const [program, setProgram] = useState('');
    const [students, setStudents] = useState([]);
    const [studentsData, setStudentsData] = useState(null);
    const [regulations, setRegulations] = useState(['R 21', 'R 17']);
    const [semesters, setSemesters] = useState(['1 SEM', '2 SEM', '3 SEM', '4 SEM', '5 SEM', '6 SEM', '7 SEM', '8 SEM']);
    const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
    const [coursesName, setCoursesName] = useState([]);
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [academicYears, setAcademicYears] = useState([]);
    const [years, setYears] = useState(['I YEAR', 'II YEAR', 'III YEAR', 'IV YEAR']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const headers = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
        { label: 'Date Of Birth', field: 'dob' },
    ];

    useEffect(() => {
        const fetchQueries = async () => {
            const queriesResult = await getQueries();

            if (queriesResult.success) {
                setCoursesName(queriesResult.data.courseNames)
                const fetchedAcademicYears = queriesResult.data.academicYears;
                const options = fetchedAcademicYears.map((option) => ({ label: option, value: option }));
                setAcademicYears(options)

                const paths = new URL(window.location).pathname;
                const arrayOfPath = paths.split('/')
                const id = arrayOfPath[arrayOfPath.length - 1];
                const batchResult = await getBatchDetails(id);
                if (batchResult) {
                    console.log(batchResult);
                    setBatchName(batchResult.data.batchName);
                    setSemester(batchResult.data.semester);
                    setAcademicYear({label: batchResult.data.academicYear, value: batchResult.data.academicYear});
                    setDepartment(batchResult.data.department);
                    setCourseName(batchResult.data.courseName);
                    console.log(batchResult.data.department);
                    setProgram(batchResult.data.program);
                    setStudentsData(batchResult.data.students)
                    setFetchedBatch(batchResult.data);
                    dispatch(showNotification({ type: "success", message: batchResult.message }))
                }
                else{
                    dispatch(showNotification({ type: "error", message: batchResult.message }))   
                }
            }
            else {
                dispatch(showNotification({ type: "error", message: queriesResult.message }))
            }
        }
        fetchQueries();
    }, []);


    const isDataModified = () => {
        return (
            batchName !== fetchedBatch.batchName ||
            semester !== fetchedBatch.semester ||
            academicYear !== fetchedBatch.academicYear ||
            department !== fetchedBatch.department ||
            courseName !== fetchedBatch.courseName ||
            program !== fetchedBatch.program
        )
    }

    const handleSubmit = async () => {
        if (!batchName || !semester || !academicYear || !department || !course || !studentsData) {
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields before submitting' }));
            return;
        }

        const isDataModifiedOrNot = isDataModified()

        if(!isDataModifiedOrNot){
            dispatch(showNotification({ type: "error", message: "No chnages were found" }))
            return 
        }

        const paths = new URL(window.location).pathname;
        const arrayOfPath = paths.split('/')
        const id = arrayOfPath[arrayOfPath.length - 1];
        const data = { id: fetchedBatch._id, batchName, semester, academicYear: academicYear.value, department, course, program, students, studentsData };
       
        const result = await updateBatchDetails(data);
        if (result.success) {
            dispatch(showNotification({ type: 'success', message: result.message }));
            navigate('/web/courses/batches');
        } else {
            dispatch(showNotification({ type: 'error', message: result.message }));
        }
    };

    const handleAddIndividualStudent = () => {
        // Implement logic to add an individual student

    };

    const handleFileInputChange = (event) => {
        console.log("Uploading file");
        const studentsFile = event.target.files[0];
        if (!studentsFile) {
            dispatch(showNotification({ type: 'error', message: 'Please select an Excel file' }));
            return;
        }

        try {
            const fileReader = new FileReader();

            fileReader.onload = async (e) => {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
                    const registerNumberIndex = headers.indexOf('register number');
                    const nameIndex = headers.indexOf('name');

                    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });
                    const registerNumbers = rows.map((row) => row[registerNumberIndex]);
                    const studentsObject = rows.map((row) => ({
                        registerNumber: row[registerNumberIndex],
                        name: row[nameIndex]
                    }));

                    setStudents(registerNumbers);
                    setStudentsData(studentsObject);
                } catch (error) {
                    console.error('Error reading Excel sheet:', error);
                    dispatch(showNotification({ type: 'error', message: 'Error reading Excel sheet' }));
                }
            };

            fileReader.readAsBinaryString(studentsFile);
        } catch (error) {
            console.error('Error handling file input change:', error);
            dispatch(showNotification({ type: 'error', message: 'Error handling file input change' }));
        }
    };


    return (
        <Layout>
            <LayoutHeader title={'Edit Batch'}/>
            <FormLayout rows={10} cols={12}>
                <SectionLayout title={'Batch Information'} />
                <InputLayout rows={3} cols={12}>
                    <Input
                        value={batchName}
                        type={'text'}
                        onChange={(e) => setBatchName(e.target.value)}
                        label={'Batch Name'}
                        rowStart={1}
                        colStart={1}
                        inputColSize={3}
                    ></Input>
                    <Select
                        label={'Program'}
                        placeholder={'Select Program'}
                        options={programs}
                        value={program}
                        onChange={(selectedOption) => setProgram(selectedOption)}
                        rowStart={2}
                        colStart={1}
                    ></Select><Select
                        label={'Department'}
                        placeholder={'Select Department'}
                        options={departments}
                        value={department}
                        onChange={(selectedOption) => setDepartment(selectedOption)}
                        rowStart={3}
                        colStart={1}
                    ></Select>
                    <Select
                        label={'Course'}
                        placeholder={'Select Course'}
                        options={coursesName}
                        value={courseName}
                        onChange={(selectedOption) => setCourseName(selectedOption)}
                        rowStart={1}
                        colStart={6}
                    ></Select>
                    <CustomCreateSelect
                        placeholder={'Select Academic Year'}
                        options={academicYears}
                        value={academicYear}
                        onChange={(selectedOption) => setAcademicYear(selectedOption)}
                        rowStart={2}
                        colStart={6}
                        label={'Academic Year'}
                    ></CustomCreateSelect>

                    <Select
                        placeholder={'Select Semester'}
                        options={semesters}
                        value={semester}
                        onChange={(selectedOption) => setSemester(selectedOption)}
                        label={'Semester'}
                        rowStart={3}
                        colStart={6}
                    ></Select>

                </InputLayout>
                <ButtonLayout>
                    <FileInput bgColor={'blue-500'} textColor={'white'} id={'studentsFile'} accept={'.xlsx, .xls'} label={'Add all students'} icon={'uiw:file-excel'} onFileSelect={(file) => handleFileInputChange(file)} />
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Add individual student'} />
                    <Button bgColor={'green-500'} textColor={'white'} text={'Save & Create'} onClick={() => handleSubmit()} />
                    <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} onClick={()=>navigate('/web/courses/batches')}/>
                </ButtonLayout>
                <SectionLayout title={'Students'} />
                <TableLayout cols={12} rows={8}>
                    <Table headers={headers} data={studentsData} className="col-span-12" />
                </TableLayout>
            </FormLayout>

        </Layout >
    );
};
