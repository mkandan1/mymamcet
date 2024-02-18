import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const Table = ({
  headers,
  data,
  onViewRow,
  view,
  multipleChoice,
  height,
  selectedRows,
  handleToggleRow,
  rowsPerPage,
  faculties,
  assignedFaculties,
  setAssignedFaculties
}) => {

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const assignFaculty = (facultyId, subjectId) => {
    const existingIndex = assignedFaculties.findIndex(item => item.subjectId === subjectId);
  
    if (existingIndex !== -1) {
      const updatedAssignedFaculties = [...assignedFaculties];
      updatedAssignedFaculties[existingIndex].facultyId = facultyId;
      setAssignedFaculties(updatedAssignedFaculties);
    } else {
      const updatedAssignedFaculties = [...assignedFaculties, { subjectId, facultyId }];
      setAssignedFaculties(updatedAssignedFaculties);
    }
  }  

  if (!data || data.length === 0) {
    return (
      <table className={`table col-span-12 border-[1.5px] border-gray-300`}>
        <thead className='bg-purple-500 border-t-2 border-l-2 border-r-2 border-b border-purple-700'>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className='text-start font-sen text-gray-50 text-[14px] font-normal tracking-tighter pl-2 p-1 pt-4'>
                <div className='flex items-center gap-1'>
                  <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                  {header.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          <tr>
            <td className='text-gray-600 text-sm pl-2 p-1 text-center' colSpan={headers.length}>
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentRows = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / 10);

  return (
    <>
      <table className='table col-span-12 auto-rows-auto border-[1.5px] border-gray-300 relative'>
        <thead className='bg-purple-500 border-t-2 border-l-2 border-r-2 border-b-4 border-purple-700 sticky top-0'>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className='text-start font-sen text-gray-50 text-[14px] font-normal tracking-tighter pl-2 p-1 pt-4'>
                <div className='flex items-center gap-1'>
                  <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                  {header.label}
                </div>
              </th>
            ))}
            {faculties?.length > 0 && (
              <th className='text-start font-sen text-gray-50 text-[14px] font-normal tracking-tighter pl-2 p-1 pt-4'>
                <div className='flex items-center gap-1'>
                  <Icon icon={'fluent:filter-20-regular'} className='text-white cursor-pointer' />
                  Faculty
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className={`bg-white overflow-auto h-${height ? height : 'full'}`}>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`cursor-pointer border ${multipleChoice && selectedRows.includes(row._id) ? 'bg-blue-100 border-blue-500' : ''} ${view && row._id === view ? 'bg-blue-100 border-blue-500' : 'border-gray-400'}`}
              onClick={() => (multipleChoice ? handleToggleRow(row._id) : onViewRow(row._id))}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className='font-manrope text-sm pl-2 p-1'>
                  {row[header.field]}
                </td>
              ))}
              {
                faculties?.length > 0 &&
                <td className='font-manrope text-sm pl-2 p-1'>
                  <select className='text-gray-600' onChange={(e) => assignFaculty(e.target.value, row._id)}>
                    <option value={''} className='text-gray-400'>Assign faculty</option>
                    {faculties.map((factly) => (
                      <option value={factly._id}>
                        {factly.firstName} {factly.lastName}
                      </option>
                    ))}
                  </select>
                </td>
              }
            </tr>
          ))}
        </tbody>
        <div className='col-span-12 flex mt-0 p-2'>
          <button
            className={`px-2 py-1 mx-1 border text-sm h-8 rounded-md flex justify-center items-center gap-2 ${currentPage != 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
          >
            <Icon icon={'teenyicons:next-solid'} className={`text-${currentPage == 1 ? 'gray-500' : 'white'} text-xs rotate-180`} />
            Previous
          </button>
          {
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-2 py-1 mx-1 border-2 text-sm h-8 w-8 rounded-full flex justify-center ${index + 1 != currentPage ? 'bg-white text-gray-500' : 'bg-blue-500 text-white'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))
          }
          <button
            className={`px-2 py-1 mx-1 border text-sm h-8 rounded-md flex justify-between items-center gap-2 ${currentPage == 1 && currentPage < totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
          >
            Next
            <Icon icon={'teenyicons:next-solid'} className={`text-${currentPage != 1 ? 'gray-500' : 'white'} text-xs`} />
          </button>
        </div>
      </table>
    </>
  );
};
