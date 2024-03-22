import { Icon } from '@iconify/react';
import React, { useRef } from 'react';

export const FileInput = ({ id, accept, label, bgColor, textColor, text, icon, onFileSelect }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = () => {
        // Access the selected file using the ref
        const selectedFile = fileInputRef.current.files[0];

        // Pass the selected file to the parent component or perform other actions
        onFileSelect(selectedFile);
    };

    return (
        <>
            <label htmlFor={id} className={`flex border rounded-md items-center gap-2 text-xs outline font-manrope font-normal tracking-tight w-auto text-${textColor} px-2 bg-${bgColor} cursor-pointer`}>
                {icon && (<Icon icon={icon} className={`text-${textColor} text-lg`} />)}
                {label}
            </label>
            <input type='file' onChange={handleFileSelect} accept={accept} className='hidden' id={id} ref={fileInputRef} />
        </>
    );
};
