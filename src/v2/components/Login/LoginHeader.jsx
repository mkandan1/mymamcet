import React from 'react'
import { Link } from 'react-router-dom'

export const LoginHeader = () => {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className='master_institute w-20'>
            <img src='https://pbs.twimg.com/profile_images/1407258288752791583/v_zuW_WK_400x400.jpg' alt=''></img>
        </div>
        <div className='user_action flex gap-4 items-center'>
            <span className='text-sm tracking-normal hidden md:inline'>New to MyMAMCET?</span>
            <Link to={'/#'} className='px-4 py-2 text-sm border-2 border-gray-300 bg-gray-100 rounded-full text-t2 font-semibold tracking-tighter'>Create an account</Link>
        </div>
    </div>
  )
}
