import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { LayoutHeader } from '../../components/LayoutHeader'
import { FormLayout } from '../../components/FormLayout'
import { InputLayout } from '../../components/InputLayout'
import { SectionLayout } from '../../components/SectionLayout'
import { Select } from '../../components/Select'
import { ButtonLayout } from '../../components/ButtonLayout'
import { Button } from '../../components/Button'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../redux/actions/notification'
import { addSemester, fetchQueries } from '../../apis/subject/subjectMapping'
import { generateAcademicYears, mapAcademicYearToSemesters } from '../../services/academicYear'
import { PopupModel } from '../../components/PopupModel'
import { getAllSubjects } from '../../apis/subject/subject'
import { TableLayout } from '../../components/TableLayout'
import { Table } from '../../components/Table'
import { useNavigate } from 'react-router-dom';
import { CustomCreateSelect } from '../../components/CustomSelect'
import { getRegulation } from '../../apis/queries/queries'

export const SubjectMapping = () => {
  const [batch, setBatch] = useState({
    program: '',
    department: '',
    batchName: '',
    academicYear: '',
    semester: '',
    regulation: ''
  })
  const [programs, setPrograms] = useState(['Undergraduate', 'Postgraduate']);
  const [departments, setDepartments] = useState(['IT', 'CSE', 'EEE', 'ECE', 'CIVIL', 'MECH']);
  const [batchNames, setBatchNames] = useState(['No batches found']);
  const [academicYears, setAcademicYears] = useState(['No academic years']);
  const [semesters, setSemesters] = useState([['No semesters']]);
  const [subjects, setSubjects] = useState();
  const [regulations, setRegulations] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headers = [
    { label: 'Subject Code', field: 'subjectCode' },
    { label: 'Subject Name', field: 'subjectName' },
    { label: 'Department', field: 'department' },
    { label: 'Regulation', field: 'regulation' },
    { label: 'Program', field: 'program' },
  ];

  const handleSelectedSubjects = (data) => {
    const selectedSubjectsArray = subjects.filter((subject) => data.includes(subject._id));
    setSelectedSubjects(selectedSubjectsArray)
    setShow(false);
  }

  const handleSave = async () => {
    const isEmpty = Object.values(batch).every(value => value == '');
    if(isEmpty){
      dispatch(showNotification({type: 'error', message: "Please fill all fields before submitting"}))
      return
    }
    const data = {program: batch.program, department: batch.department, batchName: batch.batchName, academicYear: batch.academicYear, semester: batch.semester, regulation: batch.regulation.value, subjects: selectedSubjects}
    const result = await addSemester(data);

  }

  useEffect(() => {
    if (batch.program == '') {
      dispatch(showNotification({ type: 'error', message: 'Please select program' }))
    }
    else {
      const fetch = async () => {
        const result = await fetchQueries(batch.program, batch.department);
        if (result.success) {
          const batches = result.data;
          const batchNames = batches.map((batch) => (batch.batchName));
          setBatchNames(batchNames.length > 0 ? batchNames : ['No batches found']);
        }
      }
      fetch()
    }
  }, [batch.department]);

  useEffect(() => {
    if (batch.semester == '') {
      return
    }
    else {
      const fetch = async () => {
        const result = await getAllSubjects();
        if (result.success) {
          const allSubjects = result.data;
          setSubjects(allSubjects)
        }
      }
      fetch()
    }
  }, [batch.semester])

  useEffect(() => {
    if (batch.batchName != 'No batches found') {
      const academicYears = generateAcademicYears(batch.batchName);
      setAcademicYears(academicYears);
      const fetch = async () =>{
        const result = await getRegulation();
        if(result.success){
          console.log(result.data);
          const regulations = result.data.map((regulation)=> ({label: regulation, value: regulation}))
          setRegulations(regulations);
        }
      }
      fetch()
    }
  }, [batch.batchName]);

  useEffect(() => {
    if (batch.academicYear != 'No academic years') {
      const semesters = mapAcademicYearToSemesters(batch.batchName, batch.academicYear);
      setSemesters(semesters)
    }
  }, [batch.academicYear])

  return (
    <Layout>
      <LayoutHeader title={'Subject Mapping'} />
      <PopupModel show={show} title={'All Subjects'} rows={5} cols={12} data={subjects} header={headers} onClose={() => setShow(false)} onSelectedRows={(data) => handleSelectedSubjects(data)} />
      <FormLayout rows={8} cols={12}>
        <SectionLayout title={'Batch'} />
        <InputLayout rows={3} cols={12}>
          <Select
            placeholder={'Select Program'}
            value={batch.program}
            options={programs}
            label={'Program'}
            onChange={(option) => setBatch((prev) => ({ ...prev, program: option }))}
            rowStart={1}
            colStart={1}
          />
          <Select
            placeholder={'Select Department'}
            value={batch.department}
            options={departments}
            label={'Department'}
            onChange={(option) => setBatch((prev) => ({ ...prev, department: option }))}
            rowStart={2}
            colStart={1}
          />
          <Select
            placeholder={'Select Batch'}
            value={batch.batchName}
            options={batchNames}
            label={'Batch'}
            onChange={(option) => setBatch((prev) => ({ ...prev, batchName: option }))}
            rowStart={3}
            colStart={1}
          />
          <Select
            placeholder={'Select Academic Year'}
            value={batch.academicYear}
            options={academicYears}
            label={'Academic Year'}
            onChange={(option) => setBatch((prev) => ({ ...prev, academicYear: option }))}
            rowStart={1}
            colStart={6}
          />
          <Select
            placeholder={'Select Semester'}
            value={batch.semester}
            options={semesters}
            label={'Semester'}
            onChange={(option) => setBatch((prev) => ({ ...prev, semester: option }))}
            rowStart={2}
            colStart={6}
          />
          <CustomCreateSelect
            placeholder={'Select Regulation'}
            value={batch.regulation}
            options={regulations}
            label={'Regulation'}
            onChange={(option)=> setBatch((prev)=> ({...prev, regulation: option}))}
          />
        </InputLayout>
        <SectionLayout title={'Subjects list'}>
          <ButtonLayout cols={5} marginTop={'0'}>
            <Button bgColor={'blue-500'} textColor={'white'} text={'Add subject'} icon={'uil:plus'} onClick={() => setShow(true)} />
            <Button bgColor={'green-500'} textColor={'white'} text={'Save'} icon={'uil:save'} onClick={() => handleSave()} />
            <Button bgColor={'white'} textColor={'gray-500'} text={'Close'} icon={'carbon:close-outline'} onClick={() => navigate('/web/courses/batches')} />
          </ButtonLayout>
        </SectionLayout>
        <Table headers={headers} data={selectedSubjects} />
      </FormLayout>
    </Layout>
  )
}
