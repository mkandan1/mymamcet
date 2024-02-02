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
import { addBatch, getQueries } from '../../apis/batch/batch';
import { FormLayout } from '../../components/FormLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { ButtonLayout } from '../../components/ButtonLayout';
import { TableLayout } from '../../components/TableLayout';
import { Button } from '../../components/Button';
import { FileInput } from '../../components/FileInput';
import { LayoutHeader } from '../../components/LayoutHeader';

export const NewBatch = () => {
    const [batchName, setBatchName] = useState('');
    const [semester, setSemester] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [department, setDepartment] = useState('');
    const [courseName, setCourseName] = useState('');
    const [regulation, setRegulation] = useState('');
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
            const result = await getQueries();
            if (result.success) {
                setCoursesName(result.data.courseNames)
                const fetchedAcademicYears = result.data.academicYears;
                const options = fetchedAcademicYears.map((option) => ({ label: option, value: option }));
                setAcademicYears(options)
                dispatch(showNotification({ type: "success", message: result.message }))
            }
            else {
                dispatch(showNotification({ type: "error", message: result.message }))
            }
        }
        fetchQueries();
    }, []);


    const handleSubmit = async () => {
        if (!batchName || !semester || !academicYear || !department || !courseName || !students || !studentsData) {
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields before submitting' }));
            return;
        }

        const data = { batchName, semester, academicYear: academicYear.value, courseName, department, program, students, studentsData };

        console.log(data);
        const result = await addBatch(data);

        if (result.success) {
            dispatch(showNotification({ type: 'success', message: result.message }));
            // navigate('/web/courses/batches');
        } else {
            dispatch(showNotification({ type: 'error', message: result.message }));
        }
    };

    const handleAddIndividualStudent = () => {
        // Implement logic to add an individual student

    };

    const handleFileInputChange = (file) => {
        if (!file) {
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
    
            fileReader.readAsBinaryString(file);
        } catch (error) {
            console.error('Error handling file input change:', error);
            dispatch(showNotification({ type: 'error', message: 'Error handling file input change' }));
        }
    };


    return (
        <Layout>
            <LayoutHeader title={'New Batch'}/>

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
