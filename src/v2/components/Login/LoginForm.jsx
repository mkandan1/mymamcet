import React from 'react';
import { Input } from '../Input/Input';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { SocialLoginButton } from '../Button/SocialLoginButton';
import Google from '../../assets/vectors/google.svg';
import Microsoft from '../../assets/vectors/microsoft.svg';
import { LoginFailed } from '../Information/Information';

export const LoginForm = () => {
    return (
        <div className='flex justify-center mt-6'>
            <div className='w-full md:w-[45%]'>
                <div className='form_label pb-6 border-b border-gray-300 text-center'>
                    <p className='text-2xl font-semibold text-t1 tracking-tight'>Login to MAMCET</p>
                </div>
                <div className='mamcet_login_form'>
                    <Input type={'text'} placeholder={'Registered email id'} label={'User name'} />
                    <Input type={'password'} placeholder={'Password'} label={'Password'} isPassword={true} />
                    <div className='py-4 text-end'>
                        <Link to={'/forgot-password'} className='text-t4 font-semibold tracking-tighter'>Forgot password?</Link>
                    </div>
                    <LoginFailed />
                    <Button text={'Login'} />
                    <div class="user-account_cont my-6">
                        <p class="more-login_label w-full text-center border-b border-gray-300"><span className='px-2 text-[14px] bg-white'>OR</span></p>
                    </div>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <SocialLoginButton text={'Continue with Google'} icon={Google} />
                            <SocialLoginButton text={'Continue with Microsoft'} icon={Microsoft} />
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
