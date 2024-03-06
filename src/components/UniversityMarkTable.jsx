import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import UniversityMarkTableHeader from './UniversityMarkTableHeader';
import PaginationControls from './PaginationControl';
import { geneteratePassingYear } from '../services/passingYear';

export const UniversityMarkTable = ({
    subjects,
    data,
    students,
    setStudents,
    onViewRow,
    view,
    multipleChoice,
    height,
    selectedRows,
    handleToggleRow,
    setNewMarks,
    newMarks,
    batch
}) => {
    const [dynamicHeaders, setDynamicHeaders] = useState([]);
    const [enteries, setEnteries] = useState(10);
    const defaultHeaders = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
    ];
    const grades = [
        { label: 'O', value: 10 },
        { label: 'A+', value: 9 },
        { label: 'A', value: 8 },
        { label: 'B+', value: 7 },
        { label: 'B', value: 6 },
        { label: 'C', value: 5 },
        { label: 'RA', value: 0 }
    ];

    const exams = ['University Exam']
    const user = useSelector((state) => (state.auth.user.user));
    const [passingYears, setPassingYears] = useState(geneteratePassingYear(batch));

    const calculateGPA = (marks, studentId) => {
        const totalCredits = subjects.reduce((total, subject) => total + subject.subjectCredit, 0);
        let totalGradePoints = 0;
        let totalCreditsEarned = 0;

        for (const mark of marks) {
            const subject = subjects.find(subject => subject._id === mark.subject);
            if (subject) {
                totalGradePoints += mark.score * subject.subjectCredit;
                totalCreditsEarned += subject.subjectCredit;
            }
        }

        const gpa = totalGradePoints / totalCreditsEarned;
        console.log(studentId);
        return gpa
    };

    const calculateCGPA = (allMarks) => {
        const totalCredits = subjects.reduce((total, subject) => total + subject.subjectCredit, 0);
        let totalGradePoints = 0;
        let totalCreditsEarned = 0;

        for (const marks of allMarks) {
            for (const mark of marks) {
                const subject = subjects.find(subject => subject._id === mark.subject);
                if (subject) {
                    totalGradePoints += mark.score * subject.subjectCredit;
                    totalCreditsEarned += subject.subjectCredit;
                }
            }
        }

        return totalGradePoints / totalCreditsEarned;
    };

    useEffect(() => {
        if (subjects.length > 0) {
            generateDynamicHeaders();
        }
    }, [subjects]);

    useEffect(() => {
        setNewMarks(newMarks);
    }, [newMarks]);

    const generateDynamicHeaders = () => {
        const additionalHeaders = subjects.map((subject) => ({
            label: subject.subjectName,
            field: subject.subjectCode,
            _id: subject._id,
            shortName: subject.shortName,
            type: subject.type
        }));
        setDynamicHeaders([...defaultHeaders, ...additionalHeaders]);
    };

    const handleEnterKeyPress = (e, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            const nextRowIndex = rowIndex + 1;
            const nextRow = students[nextRowIndex];
            if (nextRow) {
                const nextInput = document.getElementById(`${nextRowIndex}-${colIndex}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleMarkChange = (studentId, subjectId, value, exam, passingYear) => {
        let isPass = value >= 50 ? "Pass" : "Fail";
        const existingMarkIndex = newMarks.findIndex(mark => mark.student === studentId && mark.subject === subjectId);

        if (existingMarkIndex !== -1) {
            const updatedMarks = [...newMarks];
            updatedMarks[existingMarkIndex] = {
                ...updatedMarks[existingMarkIndex],
                score: value,
                isPass: isPass,
                passingYear: passingYear // Make sure passingYear is defined here
            };
            setNewMarks(updatedMarks);
        } else {
            const newMark = {
                student: studentId,
                subject: subjectId,
                score: value,
                exam,
                isPass: isPass,
                passingYear: passingYear // Make sure passingYear is defined here
            };
            console.log(newMark);
            setNewMarks([...newMarks, newMark]);
        }
    };

    const handlePassingYearChange = (studentId, subjectId, passingYear) => {
        const existingMarkIndex = newMarks.findIndex(mark => mark.student === studentId && mark.subject === subjectId);

        if (existingMarkIndex !== -1) {
            const updatedMarks = [...newMarks];
            updatedMarks[existingMarkIndex] = {
                ...updatedMarks[existingMarkIndex],
                passingYear: passingYear
            };
            setNewMarks(updatedMarks);
        } else {
            // If the mark doesn't exist yet, you can decide what to do in this case
            // For example, you might want to ignore the change or add a new mark with this passing year
        }
    };




    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * enteries;
    const endIndex = startIndex + enteries;
    const currentRows = students.slice(startIndex, endIndex);
    const totalPages = Math.ceil(students.length / enteries);

    return (
        <>
            <div className="w-full overflow-x-auto custom-scrollbar">
                <div className='w-full flex justify-end mb-2'>

                </div>
                <table className="col-span-12 border-[1.5px] border-gray-300 relative overflow-x-auto">
                    <UniversityMarkTableHeader exams={exams} subjects={subjects} />
                    <tbody className={`bg-white h-${height ? height : 'full'} text-sm`}>
                        {currentRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`cursor-pointer font-manrope border ${multipleChoice && selectedRows.includes(row._id) ? 'bg-blue-100 border-blue-500' : ''} ${view && row._id === view ? 'bg-blue-100 border-blue-500' : 'border-gray-400'}`}
                                onClick={() => (multipleChoice ? handleToggleRow(row._id) : onViewRow(row._id))}
                            >

                                <td className={`h-2 pl-6 border-r pr-2 bg-slate-50 sticky left-0`}>
                                    <span className='font-manrope text-sm tracking-normal'>{row.registerNumber}</span>
                                </td>
                                <td className={`h-2 pl-6 border-r pr-2 bg-slate-50`}>
                                    <span className='font-manrope text-sm tracking-normal'>{row.name}</span>
                                </td>
                                {exams.map((exam, examIndex) => (
                                    <>
                                        {dynamicHeaders
                                            .map((subject, subjectIndex) => {
                                                if (subject.label !== 'Register Number' && subject.label !== 'Name') {
                                                    return (
                                                        <>
                                                            {
                                                                data.semesters[0].assignedFaculties.some(assignment => assignment.subjectId === subject._id && assignment.facultyId === user._id) ? (
                                                                    <>
                                                                        <td key={subjectIndex} className='border border-gray-300'>
                                                                            <select
                                                                                value={newMarks.find(mark => mark.student == row._id && mark.exam == exam && mark.subject === subject._id)?.score || ''}
                                                                                id={`${rowIndex}-${subjectIndex}`}
                                                                                className={`w-full h-8 bg-white font-manrope`}
                                                                                onChange={(e) => handleMarkChange(row._id, subject._id, e.target.value, exam)}
                                                                                onKeyDown={(e) => handleEnterKeyPress(e, rowIndex, subjectIndex)}
                                                                            >
                                                                                {grades.map((grade, index) => (
                                                                                    <option key={index} value={grade.value}>{grade.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </td>

                                                                        <td className='border w-24 border-gray-300'>
                                                                            <>
                                                                                {newMarks.find(mark => mark.student === row._id && mark.exam === exam && mark.subject === subject._id)?.score === '0' ? (
                                                                                    <> <select className='w-full h-8 bg-gray-200'
                                                                                        disabled
                                                                                        value={newMarks.find(mark => mark.student == row._id && mark.exam == exam && mark.subject === subject._id)?.passingYear || ''}
                                                                                        onChange={(e) => handlePassingYearChange(row._id, subject._id, e.target.value)}
                                                                                    >
                                                                                        <option value={""}>{""}</option>
                                                                                        {passingYears.map((year) => (
                                                                                            <option key={year} value={year}>{year}</option>
                                                                                        ))}

                                                                                    </select>
                                                                                    </>
                                                                                ) : (
                                                                                    <><select className='w-20 h-8'
                                                                                        value={newMarks.find(mark => mark.student == row._id && mark.exam == exam && mark.subject === subject._id)?.passingYear || ''}
                                                                                        onChange={(e) => handlePassingYearChange(row._id, subject._id, e.target.value)}
                                                                                    >
                                                                                        <option value={""}>{""}</option>
                                                                                        {passingYears.map((year) => (
                                                                                            <option key={year} value={year}>{year}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                    </>
                                                                                )}

                                                                            </>
                                                                        </td>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <td key={subjectIndex} className='border border-gray-300' id={`${subject.label}`}>
                                                                            <select
                                                                                value={newMarks.find(mark => mark.student == row._id && mark.exam == exam && mark.subject === subject._id)?.score || ''}
                                                                                id={`${rowIndex}-${subjectIndex}`}
                                                                                className={`w-full h-8 bg-gray-200 font-manrope cursor-not-allowed`}
                                                                                onChange={(e) => handleMarkChange(row._id, subject._id, e.target.value, exam)}
                                                                                disabled
                                                                                onKeyDown={(e) => handleEnterKeyPress(e, rowIndex, subjectIndex)}
                                                                            >
                                                                                <option value={''}>You are not assigned</option>
                                                                                {grades.map((grade, index) => (
                                                                                    <option key={index} value={grade.value}>{grade.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </td>

                                                                        <td className='border w-20 border-gray-300'>
                                                                            <select disabled className=' bg-gray-200 h-8 w-full'>
                                                                                {
                                                                                    passingYears.map((year) => (
                                                                                        <option value={year}>{year}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </td>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return null
                                                }
                                            })}
                                    </>
                                ))}

                                <td className="border text-center"></td>
                                <td className="border text-center"></td>
                                <td className="border text-center"></td>
                                <td className="border text-center"></td>
                                <td className="border text-center"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            <PaginationControls currentPage={currentPage} totalPages={totalPages} setCurrentPage={(page) => setCurrentPage(page)} enteries={enteries} setEnteries={(num) => setEnteries(num)} />
        </>
    );
};
