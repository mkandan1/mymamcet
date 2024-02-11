import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { SubjectServices } from '../../apis/subject/subject';
import { Icon } from '@iconify/react';
import { Table } from '../../components/Table';
import { showNotification } from '../../redux/actions/notification';
import { TableLayout } from '../../components/TableLayout';
import { Button } from '../../components/Button'
import { ButtonLayout } from '../../components/ButtonLayout';

export const Subjects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [view, setView] = useState();
  const headers = [
    { label: 'Subject Code', field: 'subjectCode' },
    { label: 'Subject Name', field: 'subjectName' },
    { label: "Subject Credit", field: 'subjectCredit' },
    { label: 'Department', field: 'department' },
    { label: 'Program', field: 'program' },
  ];

  useEffect(() => {
    SubjectServices.getAllSubjects()
      .then((data) => { setData(data.subjects); setIsLoading(false) })
      .catch((err) => { dispatch(showNotification({ type: "error", message: err.message })); setIsLoading(false) })
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (subject) =>
          subject.subjectName.toLowerCase().includes(query.toLowerCase()) ||
          subject.subjectCode.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [data, query]);

  return (
    <Layout>
      <div className='row-start-1 row-span-1 col-span-12 items-center border-b px-4 grid grid-rows-1 grid-cols-12'>
        <h3 className='font-sen font-medium text-lg tracking-tighter text-gray-600'>All subjects</h3>
      </div>
      <div className='row-start-2 row-span-1 col-span-12 items-center px-4 grid grid-cols-12'>
        <ButtonLayout>
          <Button bgColor={'green-500'} textColor={'white'} text={'Create'} icon={'oui:plus'} onClick={()=> navigate('/web/courses/subjects/subject/new')}/>
          <Button bgColor={'blue-500'} textColor={'white'} text={'Edit'} icon={'bx:edit'} onClick={()=> view && (navigate('/web/courses/subjects/subject/'+view))} />
        </ButtonLayout>
        {/* <div className='col-start-10 col-span-5 grid grid-cols-4 gap-2'>
          <input type='search' className='h-[32px] border border-gray-500 bg-white w-full text-xs col-span-3' placeholder='Type subject name...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className='bg-blue-500 text-white h-[32px] font-manrope text-sm col-span-1'>Search</button>
        </div> */}
      </div>
      <TableLayout cols={12} rows={8} px={'4'}>
        <Table headers={headers} data={filteredData} onViewRow={(id) => setView(id)} view={view} />
      </TableLayout>
    </Layout>
  );
};
