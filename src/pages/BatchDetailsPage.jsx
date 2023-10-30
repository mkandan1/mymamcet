import React, { useLayoutEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const BatchDetailsPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
            <div className='h-full pt-24 md:ml-96'>
                <PageHeader title="Batches" enablePath={true} rootPath="Batch" subPath="Batch Details" />

                {

                    !isLoading ? (
                        <div className='flex'>
                            <div className='w-full'>

                            </div>
                        </div>
                    ) : (
                        <div className='w-full h-screen pt-20 flex justify-center'>
                            <p className='text-slate-400'><FontAwesomeIcon icon={faSpinner} className='text-slate-400 animate-spin text-sm' /> Loading</p>
                        </div>
                    )

                }
            </div >
        </div >
    )
}
