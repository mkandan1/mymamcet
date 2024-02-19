import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { LayoutHeader } from '../../components/LayoutHeader'
import { FormLayout } from '../../components/FormLayout'
import { SectionLayout } from '../../components/SectionLayout'
import { InputLayout } from '../../components/InputLayout'
import { Select } from '../../components/Select'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../../redux/actions/notification'
import { generateAcademicYears, mapAcademicYearToSemesters } from '../../services/academicYear'
import { Queries } from '../../apis/queries/queries'
import { ButtonLayout } from '../../components/ButtonLayout'
import { Button } from '../../components/Button'
import { Table } from '../../components/Table'
import { Exam } from '../../apis/exam/exam'
import { MarkTable } from '../../components/MarkTable'
import { MarkAllocationPopup } from '../../components/MarkAllocationPopup'
import { isObjectEmpty } from '../../services/IsObjectEmpty'

export const MarkAllocation = () => {
    const [coursesName, setCoursesName] = useState([]);
    const user = useSelector((state) => (state.auth.user.user))
    const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
    const [departments, setDepartments] = useState(['IT', 'CSE', 'EEE', 'ECE', 'CIVIL', 'MECH']);
    const [batchNames, setBatchNames] = useState(['No batches found']);
    const [academicYears, setAcademicYears] = useState(['No academic years']);
    const [semesters, setSemesters] = useState([['No semesters']]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [view, setView] = useState();
    const [regulations, setRegulations] = useState([]);
    const [exams, setExams] = useState(['Internal Exam', 'University Exam'])
    const [data, setData] = useState([]);
    const [newMarks, setNewMarks] = useState([]);
    const [alreadyEnteredMark, setAlreadyEnteredMark] = useState([])
    const [show, setShow] = useState(false);
    const [batch, setBatch] = useState({
        program: 'Undergraduate',
        department: 'IT',
        batchName: '2021 - 2025',
        academicYear: '2021 - 2022',
        semester: '2 SEM',
        exam: '',
        regulation: 'R 21',
        courseName: 'B.Tech Information Technology',
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
        Queries.getRegulations().then((snapshot) => {
            setRegulations(snapshot.queries.regulation)
        })
    }, [])

    useEffect(() => {
        if (batch.regulation && batch.department && batch.program) {
            const query = [{ collectionName: "courses", values: { program: batch.program, department: batch.department, regulation: batch.regulation }, responseData: ["courseName"] }];
            Queries.getDocuments(query)
                .then((data) => { setCoursesName(data.options.courseName) })
                .catch((err) => { console.log(err); dispatch(showNotification({ type: "error", message: err.message })) })
        }
    }, [batch.regulation]);

    useEffect(() => {
        if (batch.courseName) {
            const queries = [{ collectionName: "batches", values: { program: batch.program, department: batch.department, courseName: batch.courseName }, responseData: ["batchName"] }]
            Queries.getDocuments(queries)
                .then((data) => {
                    setBatchNames(data.options.batchName)
                }).catch((err) => dispatch(showNotification({ type: "error", message: err.response.data.message })))
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

    const handleGetStudentsAndSemester = async () => {

        const parameters = { program: batch.program, department: batch.department, exam: batch.exam, regulation: batch.regulation, courseName: batch.courseName, batchName: batch.batchName, academicYear: batch.academicYear, semester: batch.semester }
        if (isObjectEmpty(batch)) {
            return dispatch(showNotification({ type: "error", message: "Please fill all fields" }))
        }
        await Exam.getStudentsAndSemester(parameters)
            .then(async (snapshot) => {
                setData(snapshot.batch)
                setStudents(snapshot.batch.students)
                const subjectsArray = await Exam.getSubjects(snapshot.batch)
                console.log(subjectsArray);
                const examScores = snapshot.batch.exams[0]?.scores || [];
                setSubjects(subjectsArray);
                setAlreadyEnteredMark(examScores);
                setNewMarks(examScores)
                setShow(true);
            })
            .catch((err) => {
                dispatch(showNotification({ type: "error", message: err.message }))
            })

        console.log(newMarks);
    }

    const handleUpdate = () => {
        const updatedMarks = newMarks.filter((mark, index) => {
            const existingMark = alreadyEnteredMark[index];
            return existingMark && mark.score !== existingMark.score;
        });

        if (updatedMarks.length === 0) {
            dispatch(showNotification({ type: 'error', message: "No marks have been updated" }));
            return;
        }

        const dataObject = { marks: updatedMarks, examId: data.exams[0]._id };

        Exam.updateScores(dataObject)
            .then((result) => {
                console.log(result);
                dispatch(showNotification({ type: "success", message: result.message }));
            })
            .catch((err) => {
                console.log(err);
                dispatch(showNotification({ type: 'error', message: err.response.data.message }));
            });
    };


    const handleSaveScore = () => {
        const facultyId = user._id;
        const assignedFaculties = data.semesters[0].assignedFaculties;

        let userExists = false;
        let handlingSubjectId;
        for (let assignment of assignedFaculties) {
            if (assignment.facultyId === facultyId) {
                userExists = true;
                handlingSubjectId = assignment.subjectId;
                break;
            }
        }

        if (!userExists) {
            dispatch(showNotification({ type: 'error', message: "You don't have permission to perform this action" }));
            return;
        }

        if (batch.exam === 'Internal Exam') {
            const allStudentsMarked = students.every(student =>
                newMarks.some(mark => mark.student === student._id && mark.exam == batch.exam && mark.score !== undefined && mark.score >= 0 && mark.score <= 100)
            );

            if (!allStudentsMarked) {
                dispatch(showNotification({ type: 'error', message: "Please enter marks for all students and ensure they are between 0 to 100" }));
                return;
            }
        }
        else {
            const allStudentsMarked = students.every(student =>
                newMarks.some(mark => mark.student === student._id && mark.exam == batch.exam && mark.score !== undefined && mark.score !== '')
            );

            if (!allStudentsMarked) {
                dispatch(showNotification({ type: 'error', message: "Please enter marks for all students and ensure they are between 0 to 100" }));
                return;
            }
        }

        const filteredMarks = newMarks.filter(mark => !alreadyEnteredMark.find(alreadyEntered => alreadyEntered._id === mark._id));
        // Check if there are no new marks to save
        if (filteredMarks.length === 0) {
            dispatch(showNotification({ type: 'error', message: "No new marks to save" }));
            return;
        }

        console.log(filteredMarks);

        // Prepare data object with only new marks
        const dataObject = { marks: filteredMarks, examId: data.exams[0]._id };
        // Send the new marks to the server for saving
        Exam.storeScores(dataObject)
            .then((result) => {
                dispatch(showNotification({ type: "success", message: result.message }));
                const updatedMarks = [...alreadyEnteredMark, ...result.scores];
                setAlreadyEnteredMark(updatedMarks)
                setNewMarks(updatedMarks);
            })
            .catch((err) => {
                console.log(err);
                dispatch(showNotification({ type: 'error', message: err.response.data.message }));
            });
    };



    return (
        <Layout>
            <LayoutHeader title={'Mark Allocation'} />
            <FormLayout rows={'12'} cols={'12'}>
                <SectionLayout title={'Batch Information'} />
                <InputLayout rows={'4'} cols={'12'}>
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
                        label={'Regulation'}
                        placeholder={'Select Regulation'}
                        value={batch.regulation}
                        onChange={(option) => setBatch((prev) => ({ ...prev, regulation: option }))}
                        options={regulations}
                        rowStart={3}
                        colStart={1}
                    />
                    <Select
                        label={'Course'}
                        placeholder={'Select Course'}
                        value={batch.courseName}
                        onChange={(option) => setBatch((prev) => ({ ...prev, courseName: option }))}
                        options={coursesName}
                        rowStart={4}
                        colStart={2}
                    />
                    <Select
                        label={'Batch'}
                        placeholder={'Select Batch'}
                        value={batch.batchName}
                        onChange={(option) => setBatch((prev) => ({ ...prev, batchName: option }))}
                        options={batchNames}
                        rowStart={1}
                        colStart={2}
                    />
                    <Select
                        placeholder={'Select Academic Year'}
                        value={batch.academicYear}
                        options={academicYears}
                        label={'Academic Year'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, academicYear: option }))}
                        rowStart={2}
                        colStart={2}
                    />
                    <Select
                        placeholder={'Select Semester'}
                        value={batch.semester}
                        options={semesters}
                        label={'Semester'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, semester: option }))}
                        rowStart={3}
                        colStart={2}
                    />
                    <Select
                        placeholder={'Select Exam Type'}
                        value={batch.exam}
                        options={exams}
                        label={'Exam'}
                        onChange={(option) => setBatch((prev) => ({ ...prev, exam: option }))}
                        rowStart={4}
                        colStart={2}
                    />
                </InputLayout>
                <MarkAllocationPopup show={show} subjects={subjects} data={data} students={students} batch={batch} onUpdate={handleUpdate} newMarks={newMarks} setNewMarks={(mark) => setNewMarks(mark)} onViewRow={(id) => setView(id)} onClose={() => setShow(false)} onSave={() => handleSaveScore()} />
                <ButtonLayout marginTop={'0'}>
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Get students'} icon={'ph:student-light'} onClick={() => handleGetStudentsAndSemester()} />
                    <Button bgColor={'green-500'} textColor={'white'} text={'Enter Marks'} icon={'uil:edit'} />
                    <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'ic:outline-cancel'} onClick={() => window.history.back()} />
                </ButtonLayout>
            </FormLayout>
        </Layout>
    )
}
