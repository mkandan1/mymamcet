import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../redux/actions/notification';
import { Icon } from '@iconify/react';

const Notification = () => {
    const { show, type, message } = useSelector((state) => (state.notification));
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`absolute bottom-10 items-center gap-2 w-80 right-5 z-20 tracking-tighter p-4 mb-4 mr-4 font-sen ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}
            style={{ display: show ? 'flex' : 'none' }}
        >
            {type == 'error' ? <Icon icon={'ic:sharp-cancel'} className='text-lg'/> : <Icon icon={'gg:check-o'} className='text-lg'/>}
            {message}
        </div>

    );
};

export default Notification;
