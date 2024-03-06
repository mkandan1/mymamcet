import React from 'react';
import { LayoutHeader } from './LayoutHeader';
import { Icon } from '@iconify/react';

export const Model = ({ title, show, subtitles, rows, cols, children, onClose }) => {
    return (
        <div className={`model-container ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} h-max-full fixed inset-0 flex items-center justify-center transition-opacity duration-300 z-10`}>
            <div className="model-overlay absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className={`model-dialog bg-white rounded-lg shadow-lg p-6 w-full h-screen transform transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="model-header border-b border-gray-300 flex items-center justify-between p-2 px-8">
                    <div>
                        <h3 className="font-manrope text-blue-500">{title}</h3>
                        {subtitles && (<h4 className='text-gray-600 font-manrope'>Batch: <span className='text-bold'>{subtitles.batchName}</span> Exam:  <span className='text-bold'>{subtitles.exam}</span> Semester: <span className='text-bold'>{subtitles.semester}</span> Academic Year: <span className='text-bold'>{subtitles.academicYear}</span></h4>)}
                    </div>
                    <Icon icon={'mdi:close-box'} className='cursor-pointer text-2xl text-gray-500' onClick={onClose} />
                </div>
                <div className={`mt-4 px-8 h-screen pb-20 overflow-auto overflow-x-auto custom-scrollbar`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
