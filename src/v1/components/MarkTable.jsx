import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

export const MarkTable = ({
    subjects,
    batch,
    students,
    onViewRow,
    view,
    multipleChoice,
    height,
    selectedRows,
    handleToggleRow,
    setNewMarks,
    newMarks
}) => {
    const [dynamicHeaders, setDynamicHeaders] = useState([]);
    const [enteries, setEnteries] = useState(10);
    const defaultHeaders = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
    ];
    const exams = ['CIA 1 Exam', 'CIA 2 Exam', 'Model Exam']
    const user = useSelector((state) => (state.auth.user.user));
    const inputRefs = useRef([])


    useEffect(() => {
        if (subjects.length > 0) {
            generateDynamicHeaders();
        }
    }, [subjects]);

    useEffect(() => {
        setNewMarks(newMarks);
    }, [newMarks]);

    console.log(newMarks);

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

    const handleEnterKeyPress = (e, examIndex, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextRowIndex = rowIndex + 1;
            const nextColIndex = colIndex;
            if (nextRowIndex < students.length && nextColIndex < dynamicHeaders.length) {
                const nextInput = document.getElementById(`${examIndex}-${nextRowIndex}-${nextColIndex}`);
                nextInput.focus();
            }
        }
    };


    const handleMarkChange = (studentId, subjectId, value, exam) => {
        let isPass = value >= 50 ? "Pass" : "Fail";

        const existingMarkIndex = newMarks.findIndex(mark => mark.student === studentId && mark.subject === subjectId && mark.exam === exam);

        if (existingMarkIndex !== -1) {
            const updatedMarks = [...newMarks];
            updatedMarks[existingMarkIndex] = {
                ...updatedMarks[existingMarkIndex],
                score: value,
                isPass: isPass
            };
            setNewMarks(updatedMarks);
        } else {
            const newMark = {
                student: studentId,
                subject: subjectId,
                score: value,
                exam,
                isPass: isPass
            };
            setNewMarks([...newMarks, newMark]);
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
                    <div className='flex gap-x-5 items-center'>
                        <span>Show</span>
                        <select value={enteries} onChange={(e) => setEnteries(e.target.value)} className='border'>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span>Entries</span>
                    </div>
                </div>
                <table className='col-span-12 w-screen border-[1.5px] border-gray-300 relative overflow-x-auto'>
                    <thead className='bg-purple-500 w-full border-t-2 border-l-2 border-r-2 border-b-4 border-purple-700 sticky top-0'>
                        <tr className='h-full w-full'>
                            <th rowSpan="2" className={`text-start w-10 sticky bg-purple-500 z-10 left-0 font-sen text-gray-50 font-normal tracking-tighter`}>
                                <div className='flex items-center gap-1 pl-4'>
                                    <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                                    Register Number
                                </div>
                            </th>
                            <th rowSpan="2" className={`text-start w-10 border border-purple-400  bg-purple-500 z-10 left-0 font-sen text-gray-50 font-normal tracking-tighter`}>
                                <div className='flex items-center gap-1 pl-4'>
                                    <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                                    Name
                                </div>
                            </th>
                            {exams.map((exam, examIndex) => (
                                <React.Fragment key={examIndex}>
                                    <th colSpan={subjects.filter(subject => subject.type === "Theory").length} className={`font-sen border border-purple-400 text-center text-gray-50 font-normal tracking-tighter`}>
                                        <div className='flex justify-center gap-1'>
                                            {exam}
                                        </div>
                                    </th>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr className='h-full w-full'>
                            {exams.map((exam, examIndex) => (
                                <React.Fragment key={examIndex}>
                                    {exam.type !== "Theory" ? (
                                        subjects
                                            .filter(subject => subject.type === "Theory")
                                            .map((subject, index) => (
                                                <th key={index} className={`text-start w-14 border border-purple-400 font-sen text-sm text-gray-50 font-normal tracking-tighter`}>
                                                    <div className='flex items-center justify-center gap-1 text-purple-300'>
                                                        {subject.shortName}
                                                        <br />
                                                        {subject.subjectCode}
                                                    </div>
                                                </th>
                                            ))
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`bg-white h-${height ? height : 'full'} text-sm`}>
                        {currentRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`cursor-pointer font-manrope border ${multipleChoice && selectedRows.includes(row._id) ? 'bg-blue-100 border-blue-500' : ''} ${view && row._id === view ? 'bg-blue-100 border-blue-500' : 'border-gray-400'}`}
                                onClick={() => (multipleChoice ? handleToggleRow(row._id) : onViewRow(row._id))}
                            >
                                {/* Render Register Number */}
                                <td className={`h-2 pl-6 border-r pr-2 bg-slate-50 sticky left-0`}>
                                    <span className='font-manrope text-sm tracking-normal'>{row.registerNumber}</span>
                                </td>
                                {/* Render Name */}
                                <td className={`h-2 pl-6 border-r pr-2 bg-slate-50`}>
                                    <span className='font-manrope text-sm tracking-normal'>{row.name}</span>
                                </td>
                                {exams.map((exam, examIndex) => (
                                    <>
                                        {dynamicHeaders
                                            .filter(header => header.type === 'Theory') // Filter out laboratory subjects
                                            .map((subject, subjectIndex) => (
                                                <td key={subjectIndex} className='border border-gray-300'>
                                                    {batch.semesters[0].assignedFaculties.some(assignment => assignment.subjectId === subject._id && assignment.facultyId === user._id) ? (
                                                        <>
                                                            <input// Store input ref
                                                                type='number'
                                                                value={newMarks.find(mark => mark.student == row._id && mark.exam == exam && mark.subject === subject._id)?.score || ''}
                                                                min={0}
                                                                max={100}
                                                                placeholder='Enter Mark'
                                                                id={`${examIndex}-${rowIndex}-${subjectIndex}`}
                                                                className={`w-full h-8 bg-white font-manrope`}
                                                                onChange={(e) => handleMarkChange(row._id, subject._id, e.target.value, exam)}
                                                                onKeyDown={(e) => handleEnterKeyPress(e, examIndex, rowIndex, subjectIndex)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <input
                                                            type='number'
                                                            value=''
                                                            min={0}
                                                            max={100}
                                                            className={`w-full h-8 cursor-not-allowed`}
                                                            disabled
                                                            placeholder='You are not assigned'
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                    </>

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            <div className='col-span-12 flex mt-0 p-2'>
                <button
                    className={`px-2 py-1 mx-1 border text-sm h-8 rounded-md flex justify-center items-center gap-2 ${currentPage != 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                >
                    <Icon icon={'teenyicons:next-solid'} className={`text-${currentPage == 1 ? 'gray-500' : 'white'} text-xs rotate-180`} />
                    Previous
                </button>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-2 py-1 mx-1 border-2 text-sm h-8 w-8 rounded-full flex justify-center ${index + 1 != currentPage ? 'bg-white text-gray-500' : 'bg-blue-500 text-white'}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))
                }
                <button
                    className={`px-2 py-1 mx-1 border text-sm h-8 rounded-md flex justify-between items-center gap-2 ${currentPage == 1 && currentPage < totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
                >
                    Next
                    <Icon icon={'teenyicons:next-solid'} className={`text-${currentPage != 1 ? 'gray-500' : 'white'} text-xs`} />
                </button>

                <div className='flex gap-x-5 items-center'>
                    <span>Show</span>
                    <select value={enteries} onChange={(e) => setEnteries(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>Entries</span>
                </div>
            </div>
        </>
    );
};
