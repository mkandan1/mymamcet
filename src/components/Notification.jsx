import React, { useEffect, useState } from 'react';
import { SET_NOTIFICATION_OFF } from '../actionTypes/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
export const Notification = ({show}) => {
    const dispatch = useDispatch();
    const {showNotification, notificationMessage, notificationCode} = useSelector((state)=> state.notification);
    useEffect(() => {
       setTimeout(() => {
            dispatch(SET_NOTIFICATION_OFF());
        }, 4000)
    }, [show])

    return (
        <div className={`fixed top-20 right-5 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className={`${notificationCode === 1 ? 'bg-green-500' : 'bg-red-500'} px-5 py-3 rounded-md`}>
                <div>
                    <h3 className='font-semibold font-poppins text-md tracking-tight text-white'>
                        {notificationCode === 1 ? 'Success' : 'Error'}
                    </h3>
                </div>
                <div>
                    <p className='font-inter text-sm text-white'>{notificationMessage}</p>
                </div>
            </div>
        </div>
    );
};
