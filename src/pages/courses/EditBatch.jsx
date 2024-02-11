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
import { Batch } from '../../apis/batch/batch';
import { LayoutHeader } from '../../components/LayoutHeader';
import { FormLayout } from '../../components/FormLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { ButtonLayout } from '../../components/ButtonLayout';
import { TableLayout } from '../../components/TableLayout';
import { Button } from '../../components/Button';
import { FileInput } from '../../components/FileInput';
import { LogPopupModel } from '../../components/LogPopupModel';
import { Queries } from '../../apis/queries/queries';
import { getID } from '../../services/getID';
import { isDataModified } from '../../services/isDataModified';

export const EditBatch = () => {
    const [batchName, setBatchName] = useState('');
    const [semester, setSemester] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [department, setDepartment] = useState('');
    const [courseName, setCourseName] = useState('');
    const [regulation, setRegulation] = useState('');
    const [program, setProgram] = useState('');
    const [students, setStudents] = useState([]);
    const batchId = getID();
    const [studentsData, setStudentsData] = useState(null);
    const [regulations, setRegulations] = useState([]);
    const [semesters, setSemesters] = useState(['1 SEM', '2 SEM', '3 SEM', '4 SEM', '5 SEM', '6 SEM', '7 SEM', '8 SEM']);
    const [departments, setDepartments] = useState(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']);
    const [coursesName, setCoursesName] = useState([]);
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [academicYears, setAcademicYears] = useState([]);
    const [fetchedBatch, setFetchedBatch] = useState([])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const headers = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
        { label: 'Date Of Birth', field: 'dob' },
        { label: 'Phone', field: 'phone' },
        { label: 'Father\'s name', field: 'fathersName' },
        { label: 'Mother\'s name', field: 'mothersName' },
        { label: 'Address', field: 'address' },
        { label: '10th Mark', field: '_10thMark' },
        { label: '12th Mark', field: '_12thMark' },
    ];

    useEffect(() => {
        const query = [{ collectionName: "courses", fields: ["regulation"] }]
        Queries.getQueries(query)
            .then((data) => setRegulations(data.queries.regulation))
            .catch((err) => dispatch(showNotification({ type: "error", message: err.message })))
        Batch.getBatchDetails(batchId).then((result) => {
            setBatchName(result.batch.batchName);
            setSemester(result.batch.semester);
            setAcademicYear(result.batch.academicYear);
            setRegulation(result.batch.regulation)
            setDepartment(result.batch.department);
            setCourseName(result.batch.courseName);
            setProgram(result.batch.program);
            setStudents(result.batch.students)
            setFetchedBatch(result.batch);
            console.log(students);
        })
    }, []);

    useEffect(() => {
        const query = [{ collectionName: "courses", values: { program, department, regulation }, responseFormat: ["courseName"] }]
        Queries.getDocuments(query)
            .then((data) => setCoursesName(data.options.courseName))
    }, [regulation, department])
    const handleSubmit = async () => {
        if (!batchName || !semester || !academicYear || !department || !course || !studentsData) {
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields before submitting' }));
            return;
        }

        const data = { _id: fetchedBatch._id, batchName, semester, academicYear, department, course, program, regulation, students, studentsData };

        if (!isDataModified(data, fetchedBatch)) {
            dispatch(showNotification({ type: "error", message: "No chnages were found" }))
            return
        }

        const paths = new URL(window.location).pathname;
        const arrayOfPath = paths.split('/')
        const id = arrayOfPath[arrayOfPath.length - 1];

        Batch.editBatchDetails(data)
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
            <LayoutHeader title={'Edit Batch'} />
            <FormLayout rows={8} cols={12}>
                <SectionLayout title={'Batch Information'} />
                <InputLayout rows={4} cols={12}>
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
                    ></Select>
                    <Select
                        label={'Department'}
                        placeholder={'Select Department'}
                        options={departments}
                        value={department}
                        onChange={(selectedOption) => setDepartment(selectedOption)}
                        rowStart={3}
                        colStart={1}
                    ></Select>
                    <Select
                        label={'Regulation'}
                        placeholder={'Select Regulation'}
                        options={regulations}
                        value={regulation}
                        onChange={(selectedOption) => setRegulation(selectedOption)}
                        rowStart={4}
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
                    <Select
                        placeholder={'Select Academic Year'}
                        options={academicYears}
                        value={academicYear}
                        onChange={(selectedOption) => setAcademicYear(selectedOption)}
                        rowStart={2}
                        colStart={6}
                        label={'Academic Year'}
                    ></Select>

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

                <SectionLayout title={'Students'}>
                    <ButtonLayout marginTop={'0'}>
                        <FileInput bgColor={'blue-500'} textColor={'white'} id={'studentsFile'} accept={'.xlsx, .xls'} label={'Add all students'} icon={'uiw:file-excel'} onFileSelect={(file) => handleFileInputChange(file)} />
                        <Button bgColor={'blue-500'} textColor={'white'} text={'Add individual student'} icon={'ph:student-duotone'} />
                        <Button bgColor={'green-500'} textColor={'white'} text={'Save & Create'} icon={'material-symbols:save-outline'} onClick={() => handleSubmit()} />
                        <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'material-symbols:cancel-outline'} onClick={() => navigate('/web/courses/batches')} />
                    </ButtonLayout>
                </SectionLayout>
                <TableLayout cols={12} rows={4}>
                    <Table headers={headers} data={students} className="col-span-12" />
                </TableLayout>
            </FormLayout>


        </Layout >
    );
};
