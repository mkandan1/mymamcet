import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { SubjectServices } from '../../apis/subject/subject';
import { CustomCreateSelect } from '../../components/CustomSelect';
import { Input } from '../../components/Input';
import { LayoutHeader } from '../../components/LayoutHeader'
import { Select } from '../../components/Select';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { FormLayout } from '../../components/FormLayout';
import { Button } from '../../components/Button';
import { ButtonLayout } from '../../components/ButtonLayout';
import { Queries } from '../../apis/queries/queries';

export const NewSubject = () => {
    const [formValues, setFormValues] = useState({
        department: '',
        program: '',
        regulation: '',
        subjectCode: '',
        subjectName: '',
        subjectCredit: '',
        shortName: '',
        type: '',
    });
    const [regulations, setRegulations] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const queries = [{ collectionName: "courses", fields: "regulation" }]
        Queries.getQueries(queries).then((result) => {
            setRegulations(result.queries.regulation);
        })
    }, [])

    const handleInputChange = (field, value) => {
        setFormValues(prevValues => ({ ...prevValues, [field]: value }));
    };

    const handleSubmit = async () => {
        const { department, program, regulation, subjectCode, subjectName, subjectCredit, shortName, type } = formValues;

        if (!department || !program || !regulation || !subjectCode || !subjectName || !subjectCredit || !shortName || !type) {
            dispatch(showNotification({ type: "error", message: "Please fill in all fields before submitting" }));
            return;
        }

        const data = { department, program, subjectCode, subjectName, subjectCredit, shortName, type};
        await SubjectServices.addSubject(data).then((data) => {
            dispatch(showNotification({ type: "success", message: data.message }));
        }).catch((err) =>
            dispatch(showNotification({ type: "error", message: err.message })))
    };

    const handleKeyDown = (e, nextField) => {
        if (e.key === 'Enter') {
            const nextInput = document.querySelector(`input[name=${nextField}]`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };
    

    return (
        <Layout>
            <LayoutHeader title={'New Subject'} />
            <FormLayout rows={12} cols={12}>
                <SectionLayout title={'Basic Information'} />
                <InputLayout rows={3} cols={10}>
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
                        rowStart={2}
                        colStart={1}
                    />
                    <Select
                        placeholder={'Select Regulation'}
                        value={formValues.regulation}
                        options={regulations}
                        onChange={(selectedOption) => handleInputChange('regulation', selectedOption)}
                        label={'Regulation'}
                        rowStart={3}
                        colStart={1}
                    />
                </InputLayout>
                <SectionLayout title={'Subject Details'} />
                <InputLayout rows={4} cols={12} overflow={true}>
                    <Input
                        label={'Subject Code'}
                        value={formValues.subjectCode}
                        onChange={(e) => handleInputChange('subjectCode', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        rowStart={1}
                        colStart={1}
                        inputColSize={2}
                    />
                    <Input
                        label={'Subject Name'}
                        value={formValues.subjectName}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        onChange={(e) => handleInputChange('subjectName', e.target.value)}
                        rowStart={2}
                        colStart={1}
                        inputColSize={2}
                    />
                    <Input
                        label={'Subject Credit'}
                        value={formValues.subjectCredit}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        onChange={(e) => handleInputChange('subjectCredit', e.target.value)}
                        rowStart={3}
                        colStart={1}
                        inputColSize={2}
                    />
                    <Input
                        label={'Short Name'}
                        value={formValues.shortName}
                        onKeyDown={(e) => handleKeyDown(e, 'subjectName')} 
                        onChange={(e) => handleInputChange('shortName', e.target.value)}
                        rowStart={1}
                        colStart={2}
                        inputColSize={3}
                    />
                    <Select
                        label={'Subject Type'}
                        placeholder={'Choose subject type'}
                        options={['Theory', 'Laboratory']}
                        value={formValues.type}
                        onChange={(option)=> handleInputChange('type', option)}
                        rowStart={2}
                        colStart={2}
                    />
                </InputLayout>
                <ButtonLayout>
                    <Button bgColor={'blue-500'} textColor={'white'} text={'Save'} icon={'material-symbols:save-as'} onClick={handleSubmit} />
                    <Button bgColor={'white'} textColor={'gray-600'} text={'Cancel'} icon={'material-symbols:cancel-outline'} onClick={() => navigate('/web/courses/subjects')} />
                </ButtonLayout>
            </FormLayout>
        </Layout>
    );
};
