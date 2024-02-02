import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../redux/actions/notification';
import { addSubject } from '../../apis/subject/subject';
import { CustomCreateSelect } from '../../components/CustomSelect';
import { Input } from '../../components/Input';
import { LayoutHeader } from '../../components/LayoutHeader'
import { Select } from '../../components/Select';
import { SectionLayout } from '../../components/SectionLayout';
import { InputLayout } from '../../components/InputLayout';
import { FormLayout } from '../../components/FormLayout';
import { Button } from '../../components/Button';
import { ButtonLayout } from '../../components/ButtonLayout';

export const NewSubject = () => {
    const [formValues, setFormValues] = useState({
        department: '',
        program: '',
        regulation: '',
        semester: '',
        subjectCode: '',
        subjectName: '',
        subjectCredit: '',
        isElective: false,
        isMandatory: false,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (field, value) => {
        setFormValues(prevValues => ({ ...prevValues, [field]: value }));
    };

    const handleSubmit = async () => {
        const { department, program, regulation, semester, subjectCode, subjectName, subjectCredit, isElective, isMandatory } = formValues;

        if (!department || !program || !regulation || !semester || !subjectCode || !subjectName || !subjectCredit) {
            dispatch(showNotification({ type: "error", message: "Please fill in all fields before submitting" }));
            return;
        }

        const data = { department: department.value, program, regulation: regulation.value, semester, subjectCode, subjectName, subjectCredit, isElective, isMandatory };
        const result = await addSubject(data);

        if (result.success) {
            dispatch(showNotification({ type: "success", message: result.message }));
        } else {
            dispatch(showNotification({ type: "error", message: result.message }));
        }
    };

    return (
        <Layout>
            <LayoutHeader title={'New Subject'} />
            <FormLayout rows={12} cols={12}>
                <SectionLayout title={'Basic Information'} />
                <InputLayout rows={3} cols={10}>
                    <CustomCreateSelect
                        placeholder={'Select Department'}
                        value={formValues.department}
                        onChange={(selectedOption) => handleInputChange('department', selectedOption)}
                        options={[
                            { label: 'CSE', value: 'CSE' },
                            { label: 'IT', value: 'IT' },
                            { label: 'ECE', value: 'ECE' },
                            { label: 'EEE', value: 'EEE' },
                            { label: 'MECH', value: 'MECH' },
                            { label: 'CIVIL', value: 'CIVIL' },{ label: 'AIDS', value: 'AIDS' }
                        ]}
                        label={'Department'}
                    />
                    <Select
                        label={'Program'}
                        options={['Undergraduate', 'Postgraduate']}
                        value={formValues.program}
                        placeholder={'Select program'}
                        onChange={(selectedOption) => handleInputChange('program', selectedOption)}
                        rowStart={2}
                        colStart={1}
                    />
                    <CustomCreateSelect
                        placeholder={'Select Regulation'}
                        value={formValues.regulation}
                        options={[
                            { label: 'R 21', value: 'R 21' },
                            { label: 'R 17', value: 'R 17' }
                        ]}
                        onChange={(selectedOption) => handleInputChange('regulation', selectedOption)}
                        label={'Regulation'}
                        rowStart={3}
                        colStart={1}
                    />
                    <Select
                        label={'Semester'}
                        options={['1 SEM', '2 SEM', '3 SEM', '4 SEM', '5 SEM', '6 SEM', '7 SEM', '8 SEM']}
                        value={formValues.semester}
                        placeholder={'Select semester'}
                        onChange={(selectedOption) => handleInputChange('semester', selectedOption)}
                    />
                </InputLayout>
                <SectionLayout title={'Subject Details'} />
                <InputLayout rows={1} cols={12} overflow={true}>
                    <Input
                        label={'Subject Code'}
                        value={formValues.subjectCode}
                        onChange={(e) => handleInputChange('subjectCode', e.target.value)}
                        rowStart={1}
                        colStart={1}
                        inputColSize={2}
                    />
                    <Input
                        label={'Subject Name'}
                        value={formValues.subjectName}
                        onChange={(e) => handleInputChange('subjectName', e.target.value)}
                        rowStart={1}
                        colStart={6}
                        inputColSize={2}
                    />
                    <Input
                        label={'Subject Credit'}
                        value={formValues.subjectCredit}
                        onChange={(e) => handleInputChange('subjectCredit', e.target.value)}
                        rowStart={1}
                        colStart={7}
                        inputColSize={2}
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
