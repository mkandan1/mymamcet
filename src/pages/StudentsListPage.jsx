import React, { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const StudentsListPage = () => {
    const [selectedQueries, setSelectedQueries] = useState([{ department: 'default', batch: 'default', academic_year: 'default', semester: 'default', exam_type: 'default' }])
    const [enableAdvanceSearch, setEnableAdvanceSearch] = useState(false);
    const handleSearchInput = (input, field) => {
        const newInputs = [...selectedQueries];
        newInputs[0][field] = input
        setSelectedQueries(newInputs);
    }
    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <div className='flex justify-between'>
                    <PageHeader title='Students List' enablePath={true} rootPath='Students' subPath='Student List' />
                </div>

                <div className='mt-10'>
                    <div className={`${enableAdvanceSearch ? 'opacity-50 hover:opacity-100 ' : ''} inline transition-all duration-300`}>
                        <input className='w-80 px-3 py-2 text-sm border outline-none font-inter' placeholder='Student Name' />
                        <button className='ml-2 text-sm bg-blue-400 text-white font-poppins font-regular px-5 py-2'><FontAwesomeIcon icon={faMagnifyingGlass} className='text-xs mr-3' /> Show Result</button>
                        <Link to='/main/batch' className='ml-2 text-sm bg-green-500 font-poppins text-white px-5 py-2'><FontAwesomeIcon icon={faAdd} className='mr-3' />New Students</Link>
                        <button className='ml-2 text-sm bg-white text-slate-600 border font-poppins font-regular px-5 py-2' onClick={() => setEnableAdvanceSearch((prev) => !prev)}><FontAwesomeIcon icon={faGear} className='text-xs mr-3' />Advanced search</button>
                    </div>
                    {
                        enableAdvanceSearch ? (
                            <div className='flex flex-wrap'>
                                <div className='w-52 mt-5 mr-2'>
                                    <div className="relative">
                                        <select
                                            className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                                            name="example"
                                            onChange={(e) => handleSearchInput(e.target.value, 'department')}
                                        >
                                            <option value="default">Department</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                                            <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-52 mt-5 mr-2'>
                                    <div className="relative">
                                        <select
                                            className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                                            name="example"
                                            onChange={(e) => handleSearchInput(e.target.value, 'department')}
                                        >
                                            <option value="default">Batch</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                                            <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
