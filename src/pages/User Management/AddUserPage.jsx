import React, { useState } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION_ON } from '../../actionTypes/actionTypes';

export const AddUserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(null)
    const dis = useDispatch();

    const handleAddUser = () => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/add/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { name: name, email: email, password: password, role: role } })
        })
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                setIsLoading(false);
                dis(SET_NOTIFICATION_ON(1, "User has been added to the platform"))
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err);
                dis(SET_NOTIFICATION_ON(0, "Unable to add user"))
            })
    }
    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <PageHeader title='Users Management' enablePath={true} rootPath='Users Management' subPath='Add user' />

                <div className='flex justify-center mt-10'>
                    <div className='w-full md:w-96 bg-white px-10 py-20'>
                        <div className='flex flex-col'>
                            <label className='font-inter font-medium text-slate-500 text-sm'>Name</label>
                            <input type='text' className='outline-none border h-8 pl-5 text-sm text-slate-700 mt-2 font-inter' placeholder='John' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='font-inter font-medium text-slate-500 text-sm'>Email</label>
                            <input type='email' className='outline-none border h-8 pl-5 text-sm text-slate-700 mt-2 font-inter' placeholder='username@example.com' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='font-inter font-medium text-slate-500 text-sm'>Password</label>
                            <input type='password' className='outline-none border h-8 pl-5 text-sm text-slate-700 mt-2 font-inter' placeholder='8 character password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='font-inter font-medium text-slate-500 text-sm'>Role</label>
                            <select className='outline-none border h-8 pl-5 text-sm text-slate-700 mt-2 font-inter' placeholder='8 character password' onChange={(e) => setRole(e.target.value)}>
                                <option value="professor">Professor</option>
                                <option value="student">Student</option>
                                <option value="hod">HoD</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className='mt-5'>
                            <button className={`text-sm py-2 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} w-full font-inter text-white`} onClick={handleAddUser}>
                                {isLoading ? <span><FontAwesomeIcon icon={faSpinner} className='text-white animate-spin' /></span> : <span>Add user</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
