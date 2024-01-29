import React, { useState, useRef, useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { addEmployeesToDB } from '../../apis/employee/employees';
import { constants } from '../../constant/constant';
import { savePhotoInFirebase } from '../../services/storeImages';
import { authorization } from '../../apis/auth/authorization';
import { useNavigate } from 'react-router-dom';

export const EmployeesOnboarding = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const user = useState(useSelector((state) => (state.auth.user).user))[0];
    const [options, setOptions] = useState(['IT', 'CSE', 'EEE', 'ECE', 'CIVIL', 'MECH']);
    const dispatch = useDispatch();
    const [photoType, setPhotoType] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        jobTitle: '',
        department: '',
        loginEmail: '',
        accessLevel: '',
        photo: constants.employees.default_profile
    });



    const handleFileInputChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            const filereader = new FileReader();
            filereader.readAsDataURL(file);
            filereader.onloadend = () => {
                const fileContent = filereader.result;
                setPhotoType(fileContent.split(';')[0].split(':')[1]);
                setFormData((prev) => ({
                    ...prev,
                    photo: fileContent
                }))
            }
        }
    };


    const handleInputChange = (event, name) => {
        const value = event.target.value;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const handleAddEmployee = async () => {

        const isEmpty = Object.values(formData).some(value => value.trim() === '');
        console.log(formData);

        if (isEmpty) {
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields' }));
        } else {
            try {
                const photoUrl = await savePhotoInFirebase(selectedFile, formData.email, photoType);

                console.log(photoUrl);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    photo: photoUrl
                }));
                const result = await addEmployeesToDB(formData);
                if (result.success) {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        dateOfBirth: '',
                        phoneNumber: '',
                        email: '',
                        address: '',
                        jobTitle: '',
                        department: '',
                        loginEmail: '',
                        accessLevel: '',
                        photo: constants.employees.default_profile
                    })
                    dispatch(showNotification({ type: 'success', message: result.message }));
                }
                else {
                    dispatch(showNotification({ type: 'error', message: result.message }));
                }
            }
            catch (err) {
                console.log(err.message);
                dispatch(showNotification({ type: 'error', message: err.message }))
            }
        }
    }

    return (
        <Layout>
            <div className='row-start-1 row-span-1 col-span-12 flex items-center bg-white border-b px-4'>
                <h3 className='font-sen font-bold tracking-tighter text-gray-600'>Employees Onboarding</h3>
            </div>
            {
                user.role > 3 ? (
                    <>
                        <div className='h-full row-start-2 grid grid-cols-12 col-span-12 items-center justify-between bg-white border-b px-4'>
                            <div className='col-span-3 gap-x-4 grid grid-cols-2'>
                                <button className='w-auto px-4 text-sm font-manrope font-regular rounded-sm bg-blue-700 text-white' onClick={handleAddEmployee}>Add employee</button>
                                <button className='w-auto px-4 text-sm font-manrope font-regular rounded-sm bg-transparent border-2' onClick={() => { navigate('/web/employees/all') }}>Cancel</button>
                            </div>
                            <div className='col-start-10 col-span-7 flex gap-4'>
                                <div className='flex gap-4 text-sm'>
                                    <p>ADD EMPLOYEE</p>
                                    <Icon icon="bxs:up-arrow" className='rotate-90' />
                                </div>
                                <div className='flex gap-4 text-sm'>
                                    <p className='text-gray-400 font-manrope'>ACCEPT</p>
                                    <Icon icon="bxs:up-arrow" className='rotate-90 text-gray-400' />
                                </div>
                                <div className='flex gap-4 text-sm'>
                                    <p className='text-gray-400 font-manrope'>COMPLETE</p>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-12 row-span-9 h-full row-start-3 grid grid-cols-12 grid-rows-12 bg-gray-100 p-4'>
                            <div className='col-span-12 row-span-12 grid grid-cols-12 grid-rows-12 w-full h-full bg-white border-2 gap-x-6 p-4'>
                                <div className='w-full col-span-2 flex-shrink-0'>
                                    <div className='flex flex-col'>
                                        <img src={formData.photo} id='profile_preview' alt='default profile' />
                                        <button className='w-auto px-4 text-sm font-manrope font-regular rounded-sm bg-blue-700 text-white mt-4'
                                            onClick={() => fileInputRef.current.click()}
                                        >Upload a photo</button>
                                        <input
                                            type='file'
                                            accept='image/*' // Limit to image files
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleFileInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='w-full col-span-10 grid grid-cols-12 row-span-12 grid-rows-12'>
                                    <div className="row-start-1 col-span-12 font-manrope text-md">
                                        <h3>Basic Information</h3>
                                    </div>

                                    <div className='row-start-2 col-span-12 grid grid-cols-12 gap-2'>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>First Name</label>
                                            <input
                                                type='text'
                                                id='firstName'
                                                name='firstName'
                                                className='bg-white border w-full text-sm'
                                                value={formData.firstName}
                                                onChange={(event) => handleInputChange(event, 'firstName')}
                                            />
                                        </div>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Last Name</label>
                                            <input
                                                type='text'
                                                id='lastName'
                                                name='lastName'
                                                className='bg-white border w-full text-sm'
                                                value={formData.lastName}
                                                onChange={(event) => handleInputChange(event, 'lastName')}
                                            />
                                        </div>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Date Of Birth</label>
                                            <input
                                                type='date'
                                                id='dob'
                                                name='dateOfBirth'
                                                className='bg-white border w-full text-sm'
                                                value={formData.dateOfBirth}
                                                onChange={(event) => handleInputChange(event, 'dateOfBirth')}
                                            />
                                        </div>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Phone number</label>
                                            <input
                                                type='text'
                                                id='phoneNumber'
                                                name='phoneNumber'
                                                className='bg-white border w-full text-sm'
                                                value={formData.phoneNumber}
                                                onChange={(event) => handleInputChange(event, 'phoneNumber')}
                                            />
                                        </div>
                                    </div>
                                    <div className='row-start-4 col-span-12 grid grid-cols-12 gap-2'>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Email</label>
                                            <input
                                                type='email'
                                                id='email'
                                                name='email'
                                                className='bg-white border w-full text-sm'
                                                value={formData.email}
                                                onChange={(event) => handleInputChange(event, 'email')}
                                            />
                                        </div>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Address</label>
                                            <input
                                                type='text'
                                                id='address'
                                                name='address'
                                                className='bg-white border w-full text-sm'
                                                value={formData.address}
                                                onChange={(event) => handleInputChange(event, 'address')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row-start-6 col-span-12 font-manrope text-md">
                                        <h3>Employment Information</h3>
                                    </div>
                                    <div className='row-start-7 col-span-12 grid grid-cols-12 gap-2'>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Job Title</label>
                                            <input
                                                type='text'
                                                id='jobTitle'
                                                name='jobTitle'
                                                className='bg-white border w-full text-sm'
                                                value={formData.jobTitle}
                                                onChange={(event) => handleInputChange(event, 'jobTitle')}
                                            />
                                        </div>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Department</label>
                                            <select
                                                className='w-full outline-none border h-[42px] pr-4 font-manrope tracking-tight text-sm'
                                                value={formData.department}
                                                onChange={(event) => handleInputChange(event, 'department')}
                                            >
                                                <option value='' disabled>Select Department</option>
                                                {options.map((option, index) => (
                                                    <option key={index} value={option} className='text-gray-700'>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="row-start-9 col-span-12 font-manrope text-md">
                                        <h3>IT and System Access</h3>
                                    </div>
                                    <div className='row-start-10 col-span-12 grid grid-cols-12 gap-2'>
                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Login email</label>
                                            <input
                                                type='email'
                                                id='login-email'
                                                name='loginEmail'
                                                className='bg-white border w-full text-sm'
                                                value={formData.loginEmail}
                                                onChange={(event) => handleInputChange(event, 'loginEmail')}
                                            />
                                        </div>

                                        <div className='col-span-3'>
                                            <label className='text-gray-600 font-medium'>Access level</label>
                                            <select
                                                id='access-level'
                                                name='accessLevel'
                                                className='bg-white border w-full text-sm h-[42px] font-manrope'
                                                value={formData.accessLevel}
                                                onChange={(event) => handleInputChange(event, 'accessLevel')}
                                            >
                                                <option value=''>Select Access Level</option>
                                                <option value='Professor'>Professor</option>
                                                <option value='Admin'>Admin</option>
                                                <option value='Office'>Office</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='row-span-2 col-span-12 flex justify-center items-center'>You don't have permission to perform this action</p>
                    </>
                )
            }

        </Layout >
    )
}
