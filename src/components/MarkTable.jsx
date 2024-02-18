import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ButtonLayout } from './ButtonLayout';
import { Button } from './Button';
import { useSelector } from 'react-redux';

export const MarkTable = ({
    subjects,
    data,
    students,
    onViewRow,
    view,
    multipleChoice,
    height,
    selectedRows,
    handleToggleRow,
    rowsPerPage,
}) => {
    const [marks, setMarks] = useState({});
    const [dynamicHeaders, setDynamicHeaders] = useState([]);
    const [enteries, setEnteries] = useState(10);
    const defaultHeaders = [
        { label: 'Register Number', field: 'registerNumber' },
        { label: 'Name', field: 'name' },
    ];
    const user = useSelector((state) => (state.auth.user.user))

    useEffect(() => {
        if (subjects.length > 0) {
            generateDynamicHeaders();
            console.log(dynamicHeaders);
        }
    }, [subjects]);

    const generateDynamicHeaders = () => {
        const additionalHeaders = subjects.map((subject) => ({
            label: subject.subjectName,
            field: subject.subjectCode,
            _id: subject._id
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

    const handleMarkChange = (studentId, subjectCode, value) => {
        const updatedMarks = { ...marks, [studentId]: { ...marks[studentId], [subjectCode]: value } };
        setMarks(updatedMarks);
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
                    <thead className='bg-purple-500 w-full border-t-2 border-l-2 border-r-2 border-b-4 border-purple-700 h-5 sticky top-0'>
                        <tr className='h-full w-full'>
                            {dynamicHeaders.map((header, index) => (
                                (header.field === 'registerNumber' || header.field === 'name') ? (
                                    <th key={index} className={`text-start sticky left-0 font-sen text-gray-50 h-20 text-[14px] font-normal tracking-tighter`}>
                                        <div className='flex items-center gap-1'>
                                            <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                                            {header.label}
                                        </div>
                                    </th>
                                ) : (
                                    <th key={index} className={`text-start font-sen text-gray-50 h-20 text-[14px] font-normal tracking-tighter`}>
                                        <div className='flex items-center gap-1'>
                                            <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                                            {header.label}
                                        </div>
                                    </th>
                                )
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
                                {dynamicHeaders.map((header, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        {header.field === 'registerNumber' || header.field === 'name' ? (
                                            <td key={colIndex} className='h-2 pl-6 sticky left-0'>
                                                {row[header.field]}
                                            </td>
                                        ) : (
                                            <td key={colIndex}>
                                                {data.semesters[0].assignedFaculties.some(assignment => assignment.subjectId == header._id && assignment.facultyId === user._id) ? (
                                                    <input
                                                        id={`${rowIndex}-${colIndex}`}
                                                        type='number'
                                                        value={marks[row._id]?.[header.field] || ''}
                                                        min={0}
                                                        max={100}
                                                        className='w-full h-8'
                                                        onChange={(e) => handleMarkChange(row._id, header.field, e.target.value)}
                                                        onKeyDown={(e) => handleEnterKeyPress(e, rowIndex, colIndex)}
                                                    />
                                                ) : (
                                                    <input
                                                        id={`${rowIndex}-${colIndex}`}
                                                        type='number'
                                                        value={marks[row._id]?.[header.field] || ''}
                                                        min={0}
                                                        max={100}
                                                        className='w-full h-8'
                                                        disabled={true}
                                                        placeholder='Your not assigned'
                                                        onChange={(e) => handleMarkChange(row._id, header.field, e.target.value)}
                                                        onKeyDown={(e) => handleEnterKeyPress(e, rowIndex, colIndex)}
                                                    />
                                                )}

                                            </td>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>

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
                </table>
            </div >

            <ButtonLayout>
                <Button bgColor={'green-500'} textColor={'white'} text={'Save Scores'} icon={'bx:save'} />
            </ButtonLayout>
        </>
    );
};
