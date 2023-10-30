import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const AddStudentPage = () => {
    return (
        <>
            <div className='min-h-screen w-screen bg-[#EFF2F4]'>
                <div className='mt-10 lg:mt-20 md:ml-72 absolute top-10 md:top-5 left-5 lg:left-5 z-0'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>Exam Management</h1>
                            <p className='text-slate-400 font-inter text-sm mt-3'>Management <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> Exam Management <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> <Link to={'/management/exam/students/add'} className='text-[#4285F4]'>Add Students</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}