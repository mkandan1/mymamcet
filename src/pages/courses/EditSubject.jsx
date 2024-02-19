import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { SubjectServices } from '../../apis/subject/subject';
import { Input } from '../../components/Input';
import { LayoutHeader } from '../../components/LayoutHeader';
import { Select } from '../../components/Select';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { FormLayout } from '../../components/FormLayout';
import { Button } from '../../components/Button';
import { ButtonLayout } from '../../components/ButtonLayout';
import { isDataModified } from '../../services/isDataModified';
import { getID } from '../../services/getID';
import { LogPopupModel } from '../../components/LogPopupModel';

export const EditSubject = () => {
    const paths = new URL(window.location).pathname;
    const subjectId = getID();
    const [fetchedData, setData] = useState();
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [formValues, setFormValues] = useState({
        department: '',
        program: '',
        subjectCode: '',
        subjectName: '',
        subjectCredit: '',
        shortName: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const subjectId = getID();
        SubjectServices.getSubjectDetails(subjectId)
            .then((data) => { setFormValues(data.subject); setData(data.subject) })
            .catch((err) => dispatch(showNotification({ type: "error", message: err.message })))

    }, [subjectId, refresh]);

    const handleInputChange = (field, value) => {
        setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    const handleDelete = () => {
        SubjectServices.deleteSubject(subjectId)
            .then((data) => navigate('/web/courses/subjects'))
            .catch((err) => dispatch(showNotification({type: "error", message: err.message})))
    }

    const handleSubmit = async () => {
        const { department, program, subjectCode, subjectName, subjectCredit, shortName } = formValues;
        console.log(formValues)
        if (!department || !program || !subjectCode || !subjectName || !subjectCredit || !shortName) {
            dispatch(showNotification({ type: 'error', message: 'Please fill in all fields before submitting' }));
            return;
        }
        const data = { _id: subjectId, department, program, subjectCode, subjectName, subjectCredit, shortName };
        console.log(isDataModified(formValues, fetchedData));
        if (!isDataModified(formValues, fetchedData)) {
            return dispatch(showNotification({ type: "error", message: "No changes were found" }))
        }
        await SubjectServices.editSubject(data).then((data) => {
            dispatch(showNotification({ type: 'success', message: data.message }));
        }).catch((err) => {
            dispatch(showNotification({ type: 'error', message: err.message }));
        })
    };

    return (
        <Layout>
            <LayoutHeader title={'Edit Subject'} />
            <FormLayout rows={12} cols={12}>
                <SectionLayout title={'Basic Information'} />
                <InputLayout rows={2} cols={10}>
                    <Select
                        label={'Program'}
                        options={['Undergraduate', 'Postgraduate']}
                        value={formValues.program}
                        placeholder={'Select program'}
                        onChange={(selectedOption) => handleInputChange('program', selectedOption)}
                        rowStart={1}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Department'}
                        value={formValues.department}
                        onChange={(selectedOption) => handleInputChange('department', selectedOption)}
                        options={['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIDS']}
                        label={'Department'}
                        rowStart={1}
                        colStart={2}
                    />
                </InputLayout>
                <SectionLayout title={'Subject Details'} />
                <InputLayout rows={3} cols={12} overflow={true}>
                    <Input
                        label={'Subject Code'}
                        value={formValues.subjectCode}
                        onChange={(e) => handleInputChange('subjectCode', e.target.value)}
                        rowStart={1}
                        colStart={1}
                        inputColSize={3}
                    />
                    <Input
                        label={'Subject Name'}
                        value={formValues.subjectName}
                        onChange={(e) => handleInputChange('subjectName', e.target.value)}
                        rowStart={1}
                        colStart={6}
                        inputColSize={3}
                    />
                    <Input
                        label={'Subject Credit'}
                        value={formValues.subjectCredit}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        onChange={(e) => handleInputChange('subjectCredit', e.target.value)}
                        rowStart={2}
                        colStart={1}
                        inputColSize={3}
                    />
                    <Input
                        label={'Short Name'}
                        value={formValues.shortName}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        onChange={(e) => handleInputChange('shortName', e.target.value)}
                        rowStart={2}
                        colStart={2}
                        inputColSize={3}
                    />
                </InputLayout>
                <LogPopupModel show={show} data={fetchedData} onClose={() => setShow(false)} handleRefresh={() => setRefresh((prev) => !prev)} />
                <ButtonLayout>
                    <Button textColor={'gray-500'} text={'View changes log'} icon={'icon-park-outline:log'} onClick={() => setShow(true)} />
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Save'} icon={'material-symbols:save-as'} onClick={handleSubmit} />
                    <Button bgColor={'red-500'} textColor={'white'} text={'Delete'} icon={'material-symbols:delete'} onClick={handleDelete} />
                    <Button bgColor={'white'} textColor={'gray-600'} text={'Cancel'} icon={'material-symbols:cancel-outline'} onClick={() => navigate('/web/courses/subjects')} />
                </ButtonLayout>
            </FormLayout>
        </Layout>
    );
};
