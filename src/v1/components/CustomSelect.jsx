import React from 'react';
import CreateSelect from 'react-select/creatable';

export const CustomCreateSelect = ({ options, placeholder, value, onChange, label, rowStart, colStart }) => {
    const styles = {
        control: (provided) => ({
            ...provided,
            height: '42px',
            padding: 0
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px',
            margin: 0,
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '14px',
            fontFamily: 'manrope',
            color: '#6b7280',
            paddingTop: 0,
        }),
        placeholder: (provided) => ({
            ...provided,
            fontFamily: 'manrope',
            color: '#6b7280',
            fontSize: '14px'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0px',
            paddingLeft: '2px',
            height: '42px',
            '&css-1ftr8wv-Input2': {
                marginTop: '0px'
            },
            '&css-y4b4ky-Input2': {
                height: '42px'
            }
        }),
        input: (provided) => ({
            ...provided,
            marginTop: '0px',
            margin: '0px',
            padding: '0px',
        })
    };
    return (
            <div className={`row-span-1 col-span-5 grid grid-rows-1 grid-cols-5 row-start-${rowStart?rowStart : ''} col-start-${colStart?colStart : ''}`}>
                <label className='text-gray-500 font-medium col-span-2'>{label}</label>
                <div className='col-span-3'>
                    <CreateSelect
                        options={options}
                        placeholder={placeholder}
                        styles={styles}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
    );
};
