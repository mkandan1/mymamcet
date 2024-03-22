import React from 'react'

export const LeftBanner = ({ }) => {
    return (
        <div className='hidden md1:block col-span-3 h-screen bg-sky-100'>
            <div className='w-full h-full flex flex-col items-center'>
                <div className='mamcet_login_banner w-[80%] pt-[50%] flex'>
                    <img src='https://www.mycamu.co.in/assets//login-imgs/viewbanner.png' alt='' />
                </div>
                <div className='mamcet_app_info absolute top-0 mt-[86vh]'>
                    <div className='text-center flex flex-col gap-2'>
                        <p className='font-bold text-t1 tracking-tighter text-base'>Get MAMCET app</p>
                        <div className='flex gap-x-4'>
                            <img src='https://www.mycamu.co.in/assets/login-imgs/android.png' alt='android' />
                            <img src='https://www.mycamu.co.in/assets/login-imgs/IOS.png' alt='app store' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
