import React, { useEffect, useState } from 'react';
import { Model } from './Model';
import { Table } from '../components/Table';
import { Input } from '../components/Input';
import { ButtonLayout } from './ButtonLayout';
import { Button } from './Button';
import { Icon } from '@iconify/react';

export const PopupModel = ({ title, rows, cols, data, header, show, onClose, onSelectedRows }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        try {
            const filtered = data.filter((row) =>
                Object.values(row).some((value) => value.toString().toLowerCase().includes(term))
            );

            setFilteredData(filtered);
        } catch (error) {
            console.error('Error during filtering:', error);
            setFilteredData([]);
        }
    };

    const handleToggleRow = (id) => {
        setSelectedRows((prev) => {
            if (prev.includes(id)) {
                // Deselect the row
                return prev.filter((rowId) => rowId !== id);
            } else {
                // Select the row
                return [...prev, id];
            }
        });
    };

    const handleImportSubjects = () => {
        onSelectedRows(selectedRows);
        onClose();
    };

    return (
        <Model title={title} show={show} rows={rows} cols={cols} onClose={onClose}>
            <div className={`grid grid-cols-${cols} grid-rows-${rows} col-span-${cols} row-span-${rows} px-2`}>
                <div className={`col-span-${cols} flex justify-between px-4 mb-4`}>
                    <Input
                        type={'search'}
                        label={'Search subject'}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                        rowStart={1}
                        colStart={1}
                        inputColSize={3}
                    />
                    <p className='font-manrope text-base'><span className='text-green-500'>{selectedRows.length}</span> subjects selected</p>
                </div>
                {filteredData ? (
                    <Table
                        data={filteredData}
                        headers={header}
                        selectedRows={selectedRows}
                        handleToggleRow={handleToggleRow}
                        multipleChoice={true}
                    />
                ) :
                    <div className='col-span-12 my-10 flex justify-center gap-2'>
                        <Icon icon={'ooui:article-not-found-ltr'} className='text-gray-500 text-xl' />
                        <p className=''>No subjects were found. Try different search</p>
                    </div>
                }
                <ButtonLayout>
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Import Subjects'} icon={'tdesign:folder-import'} onClick={handleImportSubjects} />
                    <Button bgColor={'white'} textColor={'gray-500'} text={'Cancel'} icon={'ic:outline-cancel'} onClick={onClose} />
                </ButtonLayout>
            </div>
        </Model>
    );
};
