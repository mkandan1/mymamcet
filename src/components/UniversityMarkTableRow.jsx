import React from 'react';

const UniversityMarkTableRow = ({ row, dynamicHeaders, data, user, exams, newMarks, handleMarkChange, handleEnterKeyPress, rowIndex, handleToggleRow, onViewRow, multipleChoice, selectedRows }) => {
    return (
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
                        .filter(header => header.type === 'Theory')
                        .map((subject, subjectIndex) => (
                            <>
                                <td key={subjectIndex} className='border border-gray-300'>
                                    {/* Render mark input or select */}
                                </td>
                                <td key={`passing-year-input-${subjectIndex}`} className='border border-gray-300'>
                                    {/* Render passing year input */}
                                </td>
                            </>
                        ))}
                </>
            ))}
        </tr>
    );
};

export default UniversityMarkTableRow;
