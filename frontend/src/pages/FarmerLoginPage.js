import React from 'react'
import LoginPage from './LoginPage'

export default function FarmerLoginPage(props) {
  return (
    <div>
      <h2 className='text-center mt-3'>Farmer Login</h2>
      <LoginPage {...props} />
    </div>
  )
}
