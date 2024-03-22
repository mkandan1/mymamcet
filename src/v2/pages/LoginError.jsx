import React from 'react'
import { Link } from 'react-router-dom'

export const LoginError = () => {
  return (
    <div>
        <p>Please login <Link to={'/login'}>here</Link></p>
    </div>
  )
}
