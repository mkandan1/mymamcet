import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '../components/PageHeader';
import * as XLSX from 'xlsx'
import { Tooltip } from "@material-tailwind/react";

export const AddBatchPage = () => {

    // This state stores details of the Batch
    const [batchDetails, setBatchDetails] = useState({
        batch: '',
        department: '',
        year: '',
        semester: '',
        academicYear: ''
    });

    const [errField, setErrField] = useState({
        batch: false,
        department: false,
        year: false,
        semester: false,
        registerNumber: false,
        academicYear: false,
        studentsList: false
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isCreateButtonDisabled, setCreateButtonDisabled] = useState(true);
    const [studentsList, setStudentsList] = useState({});

    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets['Sheet1'];

            const objectsArray = {};

            for (let rowIndex = 2; sheet[`A${rowIndex}`]; rowIndex++) {
                const registerNumber = sheet[`A${rowIndex}`]?.v;
                const name = sheet[`B${rowIndex}`]?.v;

                if (registerNumber && name) {
                    objectsArray[registerNumber] = { name, registerNumber };
                }
            }
            setStudentsList(objectsArray);
        };
        reader.readAsArrayBuffer(event.target.files[0]);
    };



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
                break;

            case "academicYear":
                const pattern = /^\d{4}\s*-\s*\d{4}$/;
                if (pattern.test(value)) {
                    errField[field] = false;
                } else {
                    errField[field] = true;
                }
                break;
            case "studentList":
                if (value != '' && value != 'default') {
                    errField[field] = false;
                }
                else {
                    errField[field] = true;
                }
                break;

            case "register":
                break;
        }
        setErrField({ ...errField });
    }


    // Handling inputs into states
    const handleInputData = (event, field) => {
        const updatedDetails = { ...batchDetails };
        updatedDetails[field] = event.target.value;

        setBatchDetails(updatedDetails);
        validateInput(event.target.value, field);
        const areAllFieldsValid =
            !errField.batch &&
            !errField.department &&
            !errField.year &&
            !errField.semester &&
            !errField.academicYear;
        setCreateButtonDisabled(!areAllFieldsValid);
    }

    const handleBatchAdd = () => {
        console.log(studentsList);
        const data = { ...batchDetails, studentsList };
        fetch(`${import.meta.env.VITE_API_URL}/batches/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ batch_details: data })
        })
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
                <div className='h-full pt-24 md:ml-96'>
                    <PageHeader title="Add Batches" enablePath={true} rootPath="Batches" subPath="Add Batches" />
                    <div className='flex justify-center mr-20 mt-10'>
                        <div className='border-[1px] border-slate-300 bg-white p-10 grid gap-2'>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Batch</label>
                                <input type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.batch ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'batch')}></input>
                                <p className='text-xs mt-1 text-red-400'>{errField.batch ? 'Enter in this format: 2021 - 2025' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Academic Year</label>
                                <input
                                    type='text'
                                    className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.academicYear ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`}
                                    onChange={(e) => handleInputData(e, 'academicYear')}
                                ></input>
                                <p className='text-xs mt-1 text-red-400'>
                                    {errField.academicYear ? 'Enter in this format: 2021-2022' : ''}
                                </p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 text-sm font-inter tracking-tight mt-5">Department</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.department ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'department')}>
                                    <option value='default' className='text-sm'>Select Department</option>
                                    <option value='IT' className='text-sm'>IT</option>
                                    <option value='CSE' className='text-sm'>CSE</option>
                                    <option value='ECE' className='text-sm'>ECE</option>
                                    <option value='AIDS' className='text-sm'>AI & DS</option>
                                    <option value='EEE' className='text-sm'>EEE</option>
                                    <option value='CIVIL' className='text-sm'>CIVIL</option>
                                    <option value='MECH' className='text-sm'>MECH</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.department ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Year</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.year ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'year')}>
                                    <option value='default' className='text-sm'>Select Year</option>
                                    <option value='I' className='text-sm'>I</option>
                                    <option value='II' className='text-sm'>II</option>
                                    <option value='III' className='text-sm'>III</option>
                                    <option value='IV' className='text-sm'>IV</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.year ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Semester</label>
                                <select type='text' className={`rounded-sm border-[1px] text-sm text-slate-500 ${errField.semester ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'semester')}>
                                    <option value='default' className='text-sm'>Select Semester</option>
                                    <option value='I' className='text-sm'>1 SEM</option>
                                    <option value='II' className='text-sm'>2 SEM</option>
                                    <option value='III' className='text-sm'>3 SEM</option>
                                    <option value='IV' className='text-sm'>4 SEM</option>
                                    <option value='V' className='text-sm'>5 SEM</option>
                                    <option value='VI' className='text-sm'>6 SEM</option>
                                    <option value='VII' className='text-sm'>7 SEM</option>
                                    <option value='VIII' className='text-sm'>8 SEM</option>
                                </select>
                                <p className='text-xs mt-1 text-red-400'>{errField.semester ? 'Select any option' : ''}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Upload student list</label>
                                <input
                                    type='file'
                                    className='mt-2'
                                    onChange={(e) => handleFileChange(e)}
                                />
                                {uploadProgress > 0 && (
                                    <div className='flex'>
                                        <div className='w-full h-2 bg-slate-100 border mt-2 relative overflow-hidden'>
                                            <div className='h-2 bg-green-500' style={{ width: `${uploadProgress}%` }}>
                                                <div className="absolute top-0 left-0 h-2 bg-green-500" style={{ width: '100%', transition: 'width 0.5s ease-out' }}></div>
                                            </div>
                                        </div>
                                        <span className='text-sm text-slate-700'>{uploadProgress}%</span>

                                    </div>
                                )}
                            </div>
                            <div className='mt-5 flex justify-between'>
                                <Link to="/main/students/list" className='bg-slate-200 flex text-sm justify-center p-2 pl-8 pr-8'>Cancel</Link>
                                <Tooltip 
                                    content="Confirm the Data before save the Batch" 
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                      }}
                                >
                                <button
                                    className={`bg-blue-500 text-white p-2 rounded-sm text-sm pl-8 pr-8 ${isCreateButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isCreateButtonDisabled} onClick={handleBatchAdd}
                                >
                                    Create
                                </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
