import React, { useState } from 'react'
import { PageHeader } from '../../components/PageHeader'

export const NewSubjectsPage = () => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const handleCreateSubject = () =>{
        setIsButtonLoading(true)
    }
    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <PageHeader title='New Subjects' enablePath={false} />

                <div className='w-full mt-20 flex justify-center'>
                    <div className='bg-white px-10 py-10'>
                        <div className='flex flex-col'>
                            <label className='font-inter text-sm font-medium text-slate-600 tracking-tight'>Subject Code</label>
                            <input type='text' className='w-80 border outline-none h-8 pl-3 font-inter mt-2 uppercase text-slate-500 text-sm'></input>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='font-inter text-sm font-medium text-slate-600 tracking-tight'>Subject Name</label>
                            <input type='text' className='w-80 border outline-none h-8 pl-3 font-inter mt-2 text-slate-500 text-sm'></input>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='font-inter text-sm font-medium text-slate-600 tracking-tight'>Credits</label>
                            <input type='text' className='w-80 border outline-none h-8 pl-3 font-inter mt-2 text-slate-500 text-sm'></input>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <button className={`w-full ${isButtonLoading ? 'bg-blue-400': 'bg-blue-600'} text-white py-2 font-red-hat text-sm`} onClick={handleCreateSubject}>{isButtonLoading ? <span>Creating a subject</span> : <span>Create new subject</span>}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
