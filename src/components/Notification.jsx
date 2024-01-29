import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../redux/actions/notification';

const Notification = () => {
    const { show, type, message } = useSelector((state) => (state.notification));
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(message);
        const timer = setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`absolute bottom-10 w-80 right-5 z-20 p-4 mb-4 mr-4 font-sen ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}
            style={{ display: show ? 'block' : 'none' }}
        >
            {message}
        </div>

    );
};

export default Notification;
