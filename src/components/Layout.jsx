import React from 'react'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { useSelector } from 'react-redux'
import Notification from './Notification'

export const Layout = ({ children }) => {
  const notificationState = useSelector((state) => (state.notification.show));


  return (
    <div className='grid grid-cols-12 grid-rows-12'>
      <Header>
        {children}
      </Header>
      <Navigation />
      {notificationState && (
        <Notification
          type="success"
          message="Employee added successfully!"
        />
      )}
    </div>
  )
}
