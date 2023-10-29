import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export const NewBatch = () => {

    // This state stores details of the Batch
    const [batchDetails, setBatchDetails] = useState({
        batch: '',
        department: '',
        year: '',
        semester: '',
        registerNumber: 8120
    });

    const [errField, setErrField] = useState({
        batch: false,
        department: false,
        year: false,
        semester: false,
        registerNumber: false
    });


    // Validating inputs
    const validateInput = (value, field) => {
        switch (field) {
            case "batch":
                const batchPattern = /^(20\d{2})\s*-\s*(20\d{2})$/;
                if (batchPattern.test(value)) {
                    errField[field] = false;
                }
                else {
                    errField[field] = true;
                }
                break
            case "department":
                if (value != '' && value != 'default') {
                    errField[field] = false;
                }
                else {
                    errField[field] = true;
                }
                break
            case "year":
                if (value != '' && value != 'default') {
                    errField[field] = false;
                }
                else {
                    errField[field] = true;
                }
                break
            case "semester":
                if (value != '' && value != 'default') {
                    errField[field] = false;
                }
                else {
                    errField[field] = true;
                }
                break
            case "register":

        }
    }

    const extraLastTwoDigit = (batchYear) => {
        const match = batchYear.match(/\d{4}/);
        if (match && match.length > 0) {
            return match[0].slice(-2);
        }
        return '00'
    }

    const generateRollNumber = (batch, department) => {
        const college_code = 8120;
        const department_code = {
            'it': 205,
            'cse': 104,
            'ece': 106,
            'aids': 243,
            'eee': 105,
            'civil': 103,
            'mech': 114
        }

        const batch_year = extraLastTwoDigit(batch);

        if (department !== "") {
            const defaultRollNumber = college_code + batch_year + department_code[department];
            return defaultRollNumber
        }
        else {
            const defaultRollNumber = college_code + batch_year;
            return defaultRollNumber
        }

    }


    // Handling inputs into states
    const handleInputData = (event, field) => {
        const updatedDetails = { ...batchDetails };
        updatedDetails[field] = event.target.value;

        // Start generating roll number
        if (field === 'batch' || field === 'department') {
            const rollNumber = generateRollNumber(updatedDetails.batch, updatedDetails.department)
            updatedDetails['registerNumber'] = rollNumber;
        }

        setBatchDetails(updatedDetails);
        console.log(updatedDetails);
        validateInput(event.target.value, field);
    }



    return (
        <>
            <div className='min-h-screen w-screen bg-[#EFF2F4]'>
                <div className='flex'>
                    <NavBar />
                    <Header />
                </div>

                <div className='mt-20 md:ml-96 px-2 pb-20'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>Batch Creation</h1>
                            <p className='text-slate-400 font-inter text-sm mt-3'>Management <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> <Link to={'/management/exam/students/add'} className='text-[#4285F4]'>Add Batch</Link></p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-20'>
                        <div className='border-[1px] border-slate-300 bg-slate-50 p-10 grid gap-2'>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm tracking-tight mt-5">Batch</label>
                                <input type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.batch ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'batch')}></input>
                                <p className='text-xs mt-1 text-red-400'>{errField.batch ? 'Enter in this format: 2021 - 2025' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm tracking-tight mt-5">Department</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.department ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'department')}>
                                    <option value='default' className='text-sm'>Select Department</option>
                                    <option value='it' className='text-sm'>IT</option>
                                    <option value='cse' className='text-sm'>CSE</option>
                                    <option value='ece' className='text-sm'>ECE</option>
                                    <option value='aids' className='text-sm'>AI & DS</option>
                                    <option value='eee' className='text-sm'>EEE</option>
                                    <option value='civil' className='text-sm'>CIVIL</option>
                                    <option value='mech' className='text-sm'>MECH</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.department ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm tracking-tight mt-5">Year</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.year ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'year')}>
                                    <option value='default' className='text-sm'>Select Year</option>
                                    <option value='i' className='text-sm'>I</option>
                                    <option value='ii' className='text-sm'>II</option>
                                    <option value='iii' className='text-sm'>III</option>
                                    <option value='iv' className='text-sm'>IV</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.year ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm tracking-tight mt-5">Semester</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.semester ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'semester')}>
                                    <option value='default' className='text-sm'>Select Semester</option>
                                    <option value='ii' className='text-sm'>II</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.semester ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm tracking-tight mt-5">Default Register Number <span className='text-xs'>(Auto Generated)</span></label>
                                <input type='text' className='rounded-sm border-[1px] text-sm text-slate-500 outline-none pl-3 p-1 mt-1' value={batchDetails.registerNumber} disabled></input>
                            </div>
                            <div className='mt-5 flex justify-between'>
                                <Link to="/batch" className='bg-slate-200 flex text-sm justify-center p-2 pl-8 pr-8'>Cancel</Link>
                                <button className='bg-blue-500 text-white p-2 rounded-sm text-sm pl-8 pr-8'>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
