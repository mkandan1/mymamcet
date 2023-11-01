import React, { useEffect, useLayoutEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Table } from '../components/Table';

export const BatchDetailsPage = () => {
    const [header, setHeader] = useState(['Register Number', 'Name', 'Year', 'Semester']);
    const [isNoResult, setIsNoResult] = useState(false);
    const [isSearchCompleted, setIsSearchCompleted] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [searchResult, setSearchResult] = useState();
    const [studentList, setStudentList] = useState();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const department = queryParams.get('department')
    const batch = queryParams.get('batch');

    useLayoutEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/fetch/batches/batch/students?department=${department}&batch=${batch}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => { return res.json() })
            .then((data) => {
                setIsNoResult(false);
                const Obj = data.result;
                setSearchResult(Obj);
                setStudentList(Obj.Students);
                setIsSearchCompleted(true)
                setShowLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setShowLoading(false)
            });
    }, []);

    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <PageHeader title="Batch" enablePath={true} rootPath="Batch" subPath="Batch Details" />

                {

                    showLoading ? (
                        <div className='flex'>
                            <div className='w-full'>
                                <div className='w-full h-screen pt-20 flex justify-center'>
                                    <p className='text-slate-400'><FontAwesomeIcon icon={faSpinner} className='text-slate-400 animate-spin text-sm' /> Loading</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )

                }

                {isSearchCompleted && !isNoResult ? (

                    <div className='max-w-full ml-2 mt-10 overflow-x-auto pr-5'>
                        <Table header={header}
                            data={Object.keys(studentList).map(registerNumber => ({
                                'Register Number': registerNumber,
                                'Name': studentList[registerNumber].name,
                                'Year': searchResult.Year,
                                'Semester': searchResult.Semester
                            }))}
                            enableRowAction={true} renderRowAction={({ row }) => (
                                <Link className='text-blue-500 text-sm font-inter' to={`/main/batch/details?department=${row['Department']}&batch=${row['Batch']}`}>Manage</Link>
                            )} />
                    </div>
                ) : <></>}
            </div >
        </div >
    )
}
