import React from 'react';

const UniversityMarkTableHeader = ({ exams, subjects }) => {
    return (
        <thead className='bg-purple-500 w-full border-t-2 border-l-2 border-r-2 border-b-4 border-purple-700 sticky top-0'>
            <tr className='h-full w-full'>
                <th rowSpan="2" className={`text-start w-10 sticky bg-purple-500 z-10 left-0 font-sen text-gray-50 font-normal tracking-tighter`}>
                    <div className='flex items-center gap-1 pl-4'>
                        Register Number
                    </div>
                </th>
                <th rowSpan="2" className={`text-start w-10 border border-purple-400  bg-purple-500 z-10 left-0 font-sen text-gray-50 font-normal tracking-tighter`}>
                    <div className='flex items-center gap-1 pl-4'>
                        Name
                    </div>
                </th>
                {exams.map((exam, examIndex) => (
                    <React.Fragment key={examIndex}>
                        <th colSpan={subjects.length + subjects.length + 5} className={`font-sen border border-purple-400 text-center text-gray-50 font-normal tracking-tighter`}>
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
                        {
                            subjects
                                .map((subject, index) => (
                                    <>
                                        <th key={index} className={`text-start w-24 border border-purple-400 font-sen text-sm text-gray-50 font-normal tracking-tighter`}>
                                            <div className='flex items-center justify-center gap-1 text-purple-300'>
                                                {subject.shortName}
                                                <br />
                                                {subject.subjectCode}
                                            </div>
                                        </th>
                                        <th>
                                            <p className='text-purple-300'>Passing Year</p>
                                        </th>
                                    </>
                                ))
                        }
                    </React.Fragment>
                ))}
                <th rowSpan={'2'} className="text-center text-sm w-14 border border-purple-400 bg-purple-500 z-10 left-0 font-sen text-purple-300 font-normal tracking-tighterrder">Semester Arrears</th>
                <th rowSpan={'2'} className="text-center text-sm w-14 border border-purple-400 bg-purple-500 z-10 left-0 font-sen text-purple-300 font-normal tracking-tighterrder">Current Arrears</th>
                <th rowSpan={'2'} className="text-center text-sm w-14 border border-purple-400 bg-purple-500 z-10 left-0 font-sen text-purple-300 font-normal tracking-tighterrder">History of Arrears</th>
                <th rowSpan={'2'} className="text-center text-sm w-14 border border-purple-400 bg-purple-500 z-10 left-0 font-sen text-purple-300 font-normal tracking-tighter">GPA</th>
                <th rowSpan={'2'} className="text-center text-sm w-14 border border-purple-400 bg-purple-500 z-10 left-0 font-sen text-purple-300 font-normal tracking-tighterrder">CGPA</th>
            </tr>
        </thead>
    );
};

export default UniversityMarkTableHeader;
