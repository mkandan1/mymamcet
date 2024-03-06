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
import { FormLayout } from '../../components/FormLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { ButtonLayout } from '../../components/ButtonLayout';
import { TableLayout } from '../../components/TableLayout';
import { Button } from '../../components/Button';
import { FileInput } from '../../components/FileInput';
import { LayoutHeader } from '../../components/LayoutHeader';
import { Queries } from '../../apis/queries/queries'
import { generateAcademicYears } from '../../services/academicYear';

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
    const [isLoading, setIsLoading] = useState(false);
    const [loadingButtonId, setLoadingButtonId] = useState();
    const [regulations, setRegulations] = useState([]);
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
    }, []);

    useEffect(() => {
        if (regulation && department && program) {
            const query = [{ collectionName: "courses", values: { program, department, regulation }, responseData: ["courseName"] }];
            Queries.getDocuments(query)
                .then((data) => { setCoursesName(data.options.courseName) })
                .catch((err) => { console.log(err); dispatch(showNotification({ type: "error", message: err.message })) })
        }
    }, [regulation]);


    useEffect(() => {
        const academicYears = generateAcademicYears(batchName);
        setAcademicYears(academicYears)
    }, [batchName])


    const handleSubmit = async () => {
        setIsLoading(true);
        setLoadingButtonId('save');
        if (!batchName || !academicYear || !regulation || !program || !department || !courseName || !students) {
            setIsLoading(false);
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields before submitting' }));
            return;
        }

        const data = { batchName, academicYear, regulation, courseName, department, program, students };
        console.log(data);
        await Batch.addBatch(data)
            .then((data) => dispatch(showNotification({ type: "success", message: data.message })))
            .catch((err) => {dispatch(showNotification({ type: "error", message: err.message })); setIsLoading(false)})

        setIsLoading(false);
    };

    const handleAddIndividualStudent = () => {
        // Implement logic to add an individual student

    };

    const handleFileInputChange = async (file) => {
        if (!file) {
            dispatch(showNotification({ type: 'error', message: 'Please select an Excel file' }));
            return;
        }

        const columnMappings = [
            {
                column: "Register Number",
                format: "registerNumber"
            },
            {
                column: "Name",
                format: "name"
            },
            {
                column: "Dob",
                format: "dob"
            },
            {
                column: "Email",
                format: "email"
            },
            {
                column: "Phone",
                format: "phone"
            },
            {
                column: "Fathers Name",
                format: "fathersName"
            },
            {
                column: "Fathers Phone",
                format: "fathersPhone"
            },
            {
                column: "Mothers Name",
                format: "mothersName"
            }, {
                column: "Mothers Phone",
                format: "mothersPhone"
            },
            {
                column: "10th Mark",
                format: "_10thMark"
            }, {
                column: "12th Mark",
                format: "_12thMark"
            }, {
                column: "Counselling Application Number",
                format: "counsellingApplicationNumber"
            }, {
                column: "Address",
                format: "address"
            },


        ]
        try {
            const fileReader = new FileReader();

            fileReader.onload = async (e) => {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    // Map column names to their respective field keys
                    const columnKeyMap = {};
                    columnMappings.forEach(({ column, format }) => {
                        const index = rows[0].indexOf(column); // Assuming column names are in the first row
                        columnKeyMap[format] = index;
                    });

                    console.log(columnKeyMap);

                    // Loop through the rows to create student objects
                    const studentsData = rows.slice(1).map((row) => {
                        const studentData = {};
                        // Populate student data dynamically using column names and their field keys
                        columnMappings.forEach(({ column, format }) => {
                            const index = columnKeyMap[format];
                            if (format === 'dob' && row[index]) {
                                const dob = XLSX.SSF.parse_date_code(row[index]);
                                const day = dob.d < 10 ? '0' + dob.d : dob.d;
                                const month = dob.m < 10 ? '0' + dob.m : dob.m;
                                studentData[format] = `${day}-${month}-${dob.y}`;
                            } else {
                                studentData[format] = row[index];
                            }
                        });
                        return studentData;
                    });

                    setStudents(studentsData)
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
            <LayoutHeader title={'New Batch'} />

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

                </InputLayout>

                <SectionLayout title={'Students'}>
                    <ButtonLayout marginTop={'0'}>
                        <FileInput bgColor={'blue-500'} textColor={'white'} id={'studentsFile'} accept={'.xlsx, .xls'} label={'Add all students'} icon={'uiw:file-excel'} onFileSelect={(file) => handleFileInputChange(file)} />
                        <Button bgColor={'blue-500'} textColor={'white'} text={'Add individual student'} icon={'ph:student-duotone'} />
                        <Button bgColor={'green-500'} textColor={'white'} text={'Save & Create'} icon={'material-symbols:save-outline'} id={'save'} isLoading={isLoading} isLoadingId={loadingButtonId} onClick={() => handleSubmit()} />
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
