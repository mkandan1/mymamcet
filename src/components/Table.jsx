import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Table = ({ header, data, enableRowAction, renderRowAction }) => {
  return (
    <table className='w-full table-auto overflow-scroll'>
      <thead>
        <tr className='text-slate-500 border-2'>
          {header.map((title, i) => (
            <th className='font-normal font-inter py-4 px-3 text-sm text-start' key={i}>
              {title} <FontAwesomeIcon className='ml-2 text-xs cursor-pointer' icon={faSort}/>
            </th>
          ))}
          {enableRowAction && <th className='font-normal font-inter py-4 px-3 text-sm text-start'>Action</th>}
        </tr>
      </thead>
      <tbody className='text-center bg-white'>
        {data.map((rowData, i) => (
          <tr className='font-inter border' key={i}>
            {header.map((field, j) => (
              <td className='text-gray-400 px-3 py-3 text-sm text-start' key={j}>
                {rowData[field]}
              </td>
            ))}
            {enableRowAction && (
              <td className='px-3 py-3 text-sm text-start'>
                {renderRowAction({ row: rowData })}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
