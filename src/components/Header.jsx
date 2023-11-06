import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useLayoutEffect, useState } from 'react'
import user from '/user.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_MENU_CLOSE, TOGGLE_MENU_OPEN } from '../actionTypes/actionTypes'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../FirebaseConfig'

export const Header = () => {
    const dispatch = useDispatch();
    const toggle = useSelector((state) => (state.toggle.status))
    const [userName, setUser] = useState({name: '', last_seen: 'Not available', photoURL: ''})

    const handleToggleMenu = () => {
        toggle ? dispatch(TOGGLE_MENU_CLOSE()) : dispatch(TOGGLE_MENU_OPEN())
    }

    useLayoutEffect(() => {
       
    })
    return (
        <div className='w-screen h-16 bg-blue-500 md:bg-white fixed top-0'>
            <header className='flex justify-between w-full h-full items-center pl-5 pr-5'>
                <FontAwesomeIcon icon={faBars} className='text-white md:hidden cursor-pointer' onClick={handleToggleMenu} />

                <div className='flex w-full h-full justify-end'>
                    <div className='mr-5 h-full flex items-center'>
                        <Link><FontAwesomeIcon icon={faBell} className='text-slate-50 md:text-slate-400' /></Link>
                    </div>
                    <div className='mr-5 flex items-center'>
                        <div className='w-[1.5px] h-8 bg-blue-400  md:bg-[#D9D9D9]'></div>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <img src={user} className='w-9 rounded-full border-2 border-green-400'></img>
                        </div>
                        <div className='ml-2'>
                            <h2 className='text-sm font-inter font-medium text-slate-50 md:text-slate-500'>Kalaiyarasan</h2>
                            <p className='text-xs font-inter text-blue-300 md:text-slate-400'>{userName.last_seen}</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}