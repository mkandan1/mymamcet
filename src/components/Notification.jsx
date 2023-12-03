import React, { useEffect, useState } from 'react';
import { SET_NOTIFICATION_OFF } from '../actionTypes/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

export const Notification = ({show}) => {
    const dispatch = useDispatch();
    const {showNotification, notificationMessage, notificationCode} = useSelector((state)=> state.notification);
    useEffect(() => {
       setTimeout(() => {
            dispatch(SET_NOTIFICATION_OFF());
        }, 4000)
    }, [show])

    return (
        <div className={`fixed top-20 right-5 transition-opacity duration-500 ${showNotification ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className={`${notificationCode === 1 ? 'bg-green-500' : 'bg-red-500'} px-5 py-3 rounded-md`}>
                <div>
                    <h3 className='font-semibold font-poppins text-md tracking-tight text-white'>
                        {notificationCode === 1 ? <span><FontAwesomeIcon icon={faCheckCircle} className='mr-2'/>Success</span> : <span><FontAwesomeIcon icon={faWarning} className='mr-2'/>Error</span>}
                    </h3>
                </div>
                <div>
                    <p className='font-inter text-sm text-white'>{notificationMessage}</p>
                </div>
            </div>
        </div>
    );
};
