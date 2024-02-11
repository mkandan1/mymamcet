import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { Batch } from '../../apis/batch/batch';
import { ButtonLayout } from '../../components/ButtonLayout';
import { LoadingState } from '../../components/LoadingState';

export const Batches = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');
    const [view, setView] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        Batch.getAllBatches().then((fetchedBatches) => {
            setData(fetchedBatches.batches)
            console.log(fetchedBatches.batches);
        }).catch(err => dispatch(showNotification({ type: "error", message: err.message })))
    }, []);

    useEffect(() => {
        // Update filteredData when the query changes
        setFilteredData(
            data.filter(batch => batch.batchName.toLowerCase().includes(query.toLowerCase()))
        );
    }, [data, query]);

    const handleView = (id) => {
        setView(id);
    };

    const headers = [
        { label: 'Course', field: 'courseName' },
        { label: 'Batch Name', field: 'batchName' },
        { label: 'Semester', field: 'semester' },
        { label: 'Academic Year', field: 'academicYear' },
    ];

    return (
        <Layout>
            <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
                <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All Batches</h3>
            </div>
            <div className='row-start-2 row-span-1 col-span-12 items-center px-4 gap-2 grid grid-cols-12'>
                <ButtonLayout>
                    <Button bgColor={'green-500'} textColor={'white'} text={'New'} icon={'streamline:add-1-solid'} onClick={() => { navigate('/web/courses/batches/batch/new') }} />
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Edit'} icon={'uil:edit'} onClick={() => { navigate(`/web/courses/batches/batch/${view}`) }} />
                </ButtonLayout>
                {/* <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-2' placeholder='Type batch name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>Search</button>
        </div> */}
            </div>
            <div className='row-span-8 col-span-12 grid grid-cols-12 grid-rows-8 px-4'>
                <LoadingState rows={8} cols={12}>
                    {Array.isArray(filteredData) && filteredData.length > 0 ? (
                        <Table headers={headers} data={filteredData} onViewRow={(id) => handleView(id)} view={view} />
                    ) : (
                        <p className='row-span-1 row-start-2 col-span-12 flex justify-center  items-center gap-2 mt-20'>
                            <Icon icon={'mdi:question-mark-box'} />
                            No data available</p>
                    )}
                </LoadingState>
            </div>
        </Layout>
    );
};
