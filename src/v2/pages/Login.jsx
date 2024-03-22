import React from 'react'
import { LeftBanner } from '../components/Login/LeftBanner'
import { Container } from '../components/Container'
import { LoginHeader } from '../components/Login/LoginHeader'
import arrow from '../assets/vectors/arrow.svg'
import { InstitutionDetails } from '../components/Login/InstitutionDetails'
import { LoginForm } from '../components/Login/LoginForm'

export const Login = () => {
  return (
    <Container width={'screen'} height={'screen'} colSpan={'12'} rowSpan={'12'} cols={'12'} rows={'12'}>
      <LeftBanner />
      <div className='px-8 py-16 col-span-12 md1:col-span-9 w-full row-span-12 bg-gray-50 overflow-auto'>
        <LoginHeader></LoginHeader>
        <div className='w-full flex justify-center mt-4'>
          <img src={arrow} />
        </div>
        <InstitutionDetails />
        <LoginForm/>
      </div>
    </Container>
  )
}
