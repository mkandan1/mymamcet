import React from 'react';
import { Icon } from '@iconify/react';

const PaginationControls = ({ currentPage, totalPages, setCurrentPage, enteries, setEnteries }) => {
    return (
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
                <select value={enteries} onChange={(e) => setEnteries(e.target.value)} className='border'>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <span>Entries</span>
            </div>
        </div>
    );
};

export default PaginationControls;
