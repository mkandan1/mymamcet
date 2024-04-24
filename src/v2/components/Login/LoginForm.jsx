import React, { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { SocialLoginButton } from '../Button/SocialLoginButton';
import Google from '../../assets/vectors/google.svg';
import Microsoft from '../../assets/vectors/microsoft.svg';
import { LoginFailed } from '../Information/Information';
import Validation from '../../constant/Validation';
import { useDispatch } from 'react-redux';
import Auth from '../../apis/auth/Auth';
import { hide2LoadingBars, show2LoadingBars } from '../../constant/LoadingIndicator';

export const LoginForm = () => {

    const [userCredentials, setUserCredentials] = useState({ email: null, password: null });
    const [loginInputError, setLoginInputError] = useState({ show: false, id: null, message: null });
    const [loginFailedError, setloginFailedError] = useState({ show: false, message: null })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cout = useState(0);

    const handleLogin = async () => {
        setloginFailedError({ show: false, message: '' })
        setLoginInputError({ show: false, id: 'email', message: '' })
        setLoginInputError({ show: false, id: 'password', message: '' })

        if (userCredentials.email == null || userCredentials.password == null) {
            console.log(userCredentials);
            if (userCredentials.email == null) {
                setLoginInputError({ show: true, id: 'email', message: 'User name is required' })
                return
            }
            else {
                setLoginInputError({ show: true, id: 'password', message: 'Password is required' })
                return
            }
        }
        else {
            setLoginInputError({ show: false, id: 'email', message: '' })
            setLoginInputError({ show: false, id: 'password', message: '' })
        }

        show2LoadingBars(dispatch)

        const emailValidation = Validation.email(userCredentials.email);
        const passwordValidation = Validation.password(userCredentials.password);
        if (!emailValidation || !passwordValidation) {
            setloginFailedError({ show: true, message: 'Login failed. Please check your username & password and try again.' })
            hide2LoadingBars(dispatch)
            return
        }

        await Auth.loginWithEmailAndPassword(userCredentials.email, userCredentials.password)
            .then((status) => {
                location.pathname = '/'
            })
            .catch((err) => {
                console.log(err);
                setloginFailedError({ show: true, message: err.message })
            })
            .finally(() => {
                hide2LoadingBars(dispatch)
            })
    }

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-full md:w-[45%]'>
                <div className='form_label pb-6 border-b border-gray-300 text-center'>
                    <p className='text-2xl font-semibold text-t1 tracking-tight'>Login to MAMCET</p>
                </div>
                <div className='mamcet_login_form'>
                    <Input
                        id={'email'}
                        type={'text'}
                        placeholder={'Registered email id'}
                        label={'User name'}
                        onEnter={(userEmail) => setUserCredentials((prev) => ({ ...prev, email: userEmail }))}
                        error={loginInputError} />
                    <Input
                        id={'password'}
                        type={'password'}
                        placeholder={'Password'}
                        label={'Password'}
                        isPassword={true}
                        onEnter={(userPassword) => setUserCredentials((prev) => ({ ...prev, password: userPassword }))}
                        error={loginInputError} />
                    <div className='py-4 text-end'>
                        <Link
                            to={'/forgot-password'}
                            className='text-t4 font-semibold tracking-tighter'>Forgot password?</Link>
                    </div>
                    <LoginFailed error={loginFailedError} />
                    <Button
                        text={'Login'}
                        onClick={() => handleLogin()} />
                    <div class="user-account_cont my-6">
                        <p class="more-login_label w-full text-center border-b border-gray-300"><span className='px-2 text-[14px] bg-white'>OR</span></p>
                    </div>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <SocialLoginButton
                                text={'Continue with Google'}
                                icon={Google} />
                            <SocialLoginButton
                                text={'Continue with Microsoft'}
                                icon={Microsoft} />
                        </div>
                        <p className='text-[13px] text-center text-t2'>By logging in, you agree to our <Link to={'/#'} className='text-t4 underline'>Terms of Use</Link> and to receive MAMCET emails & updates and acknowledge that you read our <Link to={'/#'} className='text-t4 underline'>Privacy Policy.</Link></p>
                        <p className='text-[13px] text-center text-t2'>2024 © MAMCET. All Rights Reserved.</p>
                        <p className='text-[13px] text-center text-t2'><Link to={'https://www.mamcet.com'}>www.mamcet.com</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
