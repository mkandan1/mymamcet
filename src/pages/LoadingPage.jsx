import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const LoadingPage = () => {
  return (
    <div className='w-full h-screen bg-gray-50 flex justify-center items-center'>
      <div className='text-center'>
        {/* <h1 className='text-xs text-gray-600 font-inter'>my<span className='font-bold'>MAMCET</span></h1> */}
        <p className='text-gray-400'><FontAwesomeIcon className='animate-spin mt-5 mr-3 text-xs' icon={faSpinner}/> Loading. Please wait</p>
      </div>
    </div>
  );
}
