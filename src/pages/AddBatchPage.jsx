import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '../components/PageHeader';
import * as XLSX from 'xlsx'
import { Tooltip } from "@material-tailwind/react";
import { Notification } from '../components/Notification';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION_OFF, SET_NOTIFICATION_ON } from '../actionTypes/actionTypes';
import { getUserIdToken } from '../services/AuthService';
export const AddBatchPage = () => {

    // This state stores details of the Batch
    const [batchDetails, setBatchDetails] = useState({
        batch: '',
        department: '',
        year: '',
        semester: '',
        academicYear: '',
        regulation : ''
    });

    const [errField, setErrField] = useState({
        batch: false,
        department: false,
        year: false,
        semester: false,
        registerNumber: false,
        academicYear: false,
        studentsList: false,
        regulation: false
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [studentsList, setStudentsList] = useState({});
    const [fileName, setFileName] = useState(null);
    const dispatch = useDispatch();
    const [btnLoading, setBtnLoading] = useState(false);


    const handleFileChange = (event) => {
        const reader = new FileReader();
        const selectedFileName = event.target.files[0].name;
        setFileName(selectedFileName);

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
            case "regulation":
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

    const handleBatchAdd = async () => {
        setBtnLoading(true);

        if (batchDetails.batch == '' || batchDetails.regulation == '' || batchDetails.academicYear == '' || batchDetails.department == '' || batchDetails.semester == '' || batchDetails.year == '') {
            setBtnLoading(false);
            dispatch(SET_NOTIFICATION_ON(0, 'Kindly fill all the fields'))
            return
        }

        const data = { ...batchDetails, studentsList };

        try {
            const idToken = await getUserIdToken();

            try {
                if (idToken == null) {
                    return new Error('User not logged in')
                }
            }
            catch (err) {
                console.error(err);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/batch/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ batch_details: data })
            })

            const resData = await response.json();

            if (!resData.status) {
                throw new Error(`Something went wrong on backend`)
                setBtnLoading(false)
            }
            else {
                setBtnLoading(false)
                dispatch(SET_NOTIFICATION_ON(1, 'Successfully created new batch'));
            }
        }
        catch (error) {
            setBtnLoading(false)
            dispatch(SET_NOTIFICATION_ON(0, error.message));
        }
    }


    return (
        <>
            <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
                <div className='h-full pt-24 md:ml-96'>
                    <PageHeader title="Add Batches" enablePath={true} rootPath="Batches" subPath="Add Batches" />
                    <div className='flex justify-center mt-10'>
                        <div className='border-[1px] border-slate-300 bg-white p-10 grid gap-2'>
                            <div className='flex items-center'>
                                <h1 className='font-manrope text-lg font-bold tracking-tight text-slate-700'>Batch creation form</h1>
                                {/* <p className='bg-green-500 inline h-5 px-3 ml-3 text-xs rounded-lg text-white'>Form</p> */}
                            </div>
                            <div className='flex flex-wrap justify-between gap-x-3'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Batch</label>
                                    <input type='text' className={`rounded-md bg-gray-50 border-[1.5px] py-2 text-sm text-slate-500 ${errField.batch ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'batch')}></input>
                                    <p className='text-xs mt-1 text-red-400'>{errField.batch ? 'Enter in this format: 2021 - 2025' : ''}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Academic Year</label>
                                    <input
                                        type='text'
                                        className={`rounded-md bg-gray-50 border-[1.5px] py-2 font-poppins text-sm text-slate-500 ${errField.academicYear ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`}
                                        onChange={(e) => handleInputData(e, 'academicYear')}
                                    ></input>
                                    <p className='text-xs mt-1 text-red-400'>
                                        {errField.academicYear ? 'Enter in this format: 2021-2022' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between gap-x-3'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-slate-600 text-sm font-inter tracking-tight mt-5">Department</label>
                                    <select type='text' className={`rounded-md bg-gray-50 border-[1.5px] py-2 font-poppins text-sm text-slate-500 ${errField.department ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'department')}>
                                        <option value='' className='text-sm'>Select Department</option>
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
                                    <select type='text' className={`rounded-md bg-gray-50 border-[1.5px] py-2 font-poppins text-sm text-slate-500 ${errField.year ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'year')}>
                                        <option value='' className='text-sm'>Select Year</option>
                                        <option value='I' className='text-sm'>I</option>
                                        <option value='II' className='text-sm'>II</option>
                                        <option value='III' className='text-sm'>III</option>
                                        <option value='IV' className='text-sm'>IV</option>
                                    </select>
                                    <p className='text-xs mt-1 text-red-400'>{errField.year ? 'Select any option' : ''}</p>
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between gap-x-3'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Semester</label>
                                    <select type='text' className={`rounded-md bg-gray-50 border-[1.5px] py-2 font-poppins text-sm text-slate-500 ${errField.semester ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'semester')}>
                                        <option value='' className='text-sm'>Select Semester</option>
                                        <option value='1 SEM' className='text-sm'>1 SEM</option>
                                        <option value='2 SEM' className='text-sm'>2 SEM</option>
                                        <option value='3 SEM' className='text-sm'>3 SEM</option>
                                        <option value='4 SEM' className='text-sm'>4 SEM</option>
                                        <option value='5 SEM' className='text-sm'>5 SEM</option>
                                        <option value='6 SEM' className='text-sm'>6 SEM</option>
                                        <option value='7 SEM' className='text-sm'>7 SEM</option>
                                        <option value='8 SEM' className='text-sm'>8 SEM</option>
                                    </select>
                                    <p className='text-xs mt-1 text-red-400'>{errField.semester ? 'Select any option' : ''}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5">Regulation</label>
                                    <select type='text' className={`rounded-md bg-gray-50 border-[1.5px] py-2 font-poppins text-sm text-slate-500 ${errField.regulation ? 'border-red-500' : ''} outline-none pl-3 p-1 mt-1 w-80`} onChange={(e) => handleInputData(e, 'regulation')}>
                                        <option value='' className='text-sm'>Select Regulation</option>
                                        <option value='R17' className='text-sm'>R 17</option>
                                        <option value='R21' className='text-sm'>R 21</option>
                                        <option value='R26' className='text-sm'>R 26</option>
                                        <option value='R30' className='text-sm'>R 30</option>
                                    </select>
                                    <p className='text-xs mt-1 text-red-400'>{errField.regulation ? 'Select any option' : ''}</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className="font-medium text-slate-600 font-inter text-sm tracking-tight mt-5 mb-3">Upload student list</label>

                                <label id="label-file-upload" htmlFor="input-file-upload">
                                    <input type="file" id="input-file-upload" multiple={false}
                                        onChange={(e) => handleFileChange(e)} />
                                    <div>
                                        {fileName != null ? <p className='text-sm py-3'>Change file? {fileName}</p> : (
                                            <>
                                                <p className='text-sm mt-2'>Drag and drop your file here or</p>
                                                <button className="upload-button text-sm ml-0 pl-0 mb-2">Upload a file</button>
                                            </>
                                        )}
                                    </div>
                                </label>
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
                            <div className='relative'>
                                <div className='bg-white border-slate-200 border-[1.2px] w-full py-4 px-5'>
                                    <div className='mb-2'>
                                        <h2 className='font-semibold text-sm font-poppins text-slate-600'>Note</h2>
                                    </div>
                                    <div>
                                        <p className='font-inter text-sm'>Student list excel document should contain these below columns in order</p>
                                        <ul className='list-disc px-10 font-inter text-sm'>
                                            <li>Register Number</li>
                                            <li>Name</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 flex justify-between'>
                                <Link to="/main/students/list" className='bg-gray-200 flex font-inter tracking-tight text-xs justify-center px-10 py-3'>Cancel</Link>

                                <button
                                    className={`bg-blue-500 font-inter text-white rounded-sm text-xs tracking-tight px-10 py-3 ${btnLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                                        }`}
                                    onClick={handleBatchAdd}>
                                    Save & Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
