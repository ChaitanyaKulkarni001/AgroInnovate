import React from 'react'
import LoginPage from './LoginPage'

export default function BuyerLoginPage(props) {
  return (
    <div>
      <h2 className='text-center mt-3'>Buyer Login</h2>
      <LoginPage {...props} />
    </div>
  )
}
