import React from 'react'
import { LeftBanner } from '../components/Login/LeftBanner'
import { Container } from '../components/Container'
import { LoginHeader } from '../components/Login/LoginHeader'
import { InstitutionDetails } from '../components/Login/InstitutionDetails'
import { LoginForm } from '../components/Login/LoginForm'
import { BackgroundAsset } from '../components/Others/BackgroundAsset'
import { FullScreenLoading } from '../components/Loading/FullScreenLoading'

export const Login = () => {
  return (
    <Container width={'screen'} height={'screen'} colSpan={'12'} rowSpan={'12'} cols={'12'} rows={'12'}>
      <LeftBanner />
      <div className='px-8 py-16 col-span-12 md1:col-span-9 w-full row-span-12 bg-gray-50 overflow-auto relative'>

        <FullScreenLoading />
        <LoginHeader />
        <BackgroundAsset />
        <InstitutionDetails />
        <LoginForm />
      </div>
    </Container>
  )
}
