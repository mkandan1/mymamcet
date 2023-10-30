import React, { useLayoutEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Table } from '../components/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const BatchesPage = () => {
    const [header, setHeader] = useState(['Department', 'Year', 'Semester', 'Batch', 'Academic Year']);
    const [departmentQuery, setDepartmentQuery] = useState([]);
    const [isQueryLoaded, setIsQueryLoaded] = useState(false);
    const [selectedQueries, setSelectedQueries] = useState([{ department: 'default' }]);
    const [isNoResult, setIsNoResult] = useState(false);
    const [isSearchCompleted, setIsSearchCompleted] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const handleSearchInput = (input, field) => {
        setShowLoading(true);
        const newInputs = [...selectedQueries];
        newInputs[0][field] = input;
        setSelectedQueries(newInputs);

        fetch(`${import.meta.env.VITE_API_URL}/fetch/management/batches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search_queries: selectedQueries })
        })
            .then((res) => { return res.json() })
            .then((data) => {

                if (data.result == null) {
                    setShowLoading(false)
                    return setIsNoResult(true)
                }
                setIsNoResult(false);
                // console.log(Object.values(data.result));
                setSearchResult(data.result)
                setIsSearchCompleted(true)
                setShowLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setShowLoading(false)
            })
    }

    useLayoutEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/fetch/exam/options`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => { return res.json() })
            .then((data) => {
                const search_options = data.search_options;
                setDepartmentQuery(search_options.departments);
                setIsQueryLoaded(true);
            })
    }, [])
    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <PageHeader title="Batches" enablePath={true} rootPath="Exam Management" subPath="Batch" />
                {
                    isQueryLoaded ? (
                        <>
                            <div className='w-52 mt-5 mr-2'>
                                <div className="relative flex items-center">
                                    <select
                                        className="appearance-none font-poppins text-[#9AB4C3] text-sm bg-white border shadow-md shadow-[#e0e8ec] py-3 pl-4 pr-10 rounded-md w-full focus:outline-none"
                                        name="example"
                                        onChange={(e) => handleSearchInput(e.target.value, 'department')}
                                    >
                                        <option value='default'>Department</option>
                                        {
                                            departmentQuery.map((item, i) => (
                                                <option value={item} key={i}>{item}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                                        <FontAwesomeIcon icon={faAngleDown} className='text-[#9AB4C3] text-sm' />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='w-full h-screen pt-20 flex justify-center'>
                            <p className='text-slate-400'><FontAwesomeIcon icon={faSpinner} className='text-slate-400 animate-spin text-sm' /> Loading</p>
                        </div>
                    )
                }
                <div className='w-full flex flex-col items-center mt-10'>
                    {
                        showLoading ? (
                            <span className='text-center font-inter text-slate-600 animate-pulse'><FontAwesomeIcon className='text-xs mx-2' icon={faMagnifyingGlass} /> Searching results...</span>
                        ) : (
                            <></>
                        )
                    }

                    {
                        isNoResult ? <><p className='text-slate-600 font-poppins text-sm'>No results...</p></> : <></>
                    }

                </div>

                {isSearchCompleted && !isNoResult ? (

                    <div className='max-w-full ml-2 mt-10 overflow-x-auto pr-5'>
                        <Table header={header} data={searchResult} enableRowAction={true} renderRowAction={({ row }) => (
                            <Link className='text-blue-500 text-xs' to={`/management/batch/details?department=${row['Department']}&batch=${row['Batch']}`}>Update</Link>
                        )} />
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}
