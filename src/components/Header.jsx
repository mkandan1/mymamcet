import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const Header = ({ children }) => {
    const [user, setUser] = useState(useSelector((state)=> (state.auth.user)).user);
    return (
        <div className='header w-full h-screen grid grid-cols-12 grid-rows-12 col-span-12 row-span-12 row-start-1 col-start-3 bg-gray-100'>
            <div className='w-full h-full col-span-12 row-span-1 px-4 row-start-1 grid grid-cols-12 grid-rows-1 border-b-2 bg-blue-500'>
                <div className='col-span-4 flex items-center'>
                    <h2 className='hidden lg:block md:text-base text-white'>
                        M.A.M. COLLEGE OF ENGINEERING AND TECHNOLOGY
                    </h2>
                </div>

                <div className='col-start-10 col-span-4 flex gap-4 items-center'>
                    <div className='flex items-center gap-4'>
                        <Link to='/web/settings'>
                            <Icon icon='iconamoon:settings-light' className='text-xl text-white font-bold' />
                        </Link>
                        <Link to='/web/notifications'>
                            <Icon icon='mingcute:notification-line' className='text-xl text-white' />
                        </Link>
                    </div>

                    <div className='flex items-center  h-full w-full'>
                        <Link to='/web/user/profile' className='flex items-center gap-3'>
                            <div className='w-[35px]'>
                                <img
                                    src={user.photo}
                                    className='w-full rounded-full'
                                    alt='profile'
                                />
                            </div>
                            <span className='font-manrope tracking-normal text-white'>
                                {user.firstName}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='col-span-12 row-span-11 grid grid-rows-11 grid-cols-12'>
                {children}
            </div>
        </div>
    );
};