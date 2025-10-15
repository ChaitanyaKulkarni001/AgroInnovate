import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ component: Component, roles, ...rest }) {
  const { userInfo } = useSelector(state => state.userLoginReducer || {})
  return (
    <Route
      {...rest}
      render={props => {
        if (!userInfo) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        if (roles && roles.length > 0) {
          const role = userInfo.role || (userInfo.user && userInfo.user.role)
          if (!roles.includes(role)) {
            return <Redirect to='/' />
          }
        }
        return <Component {...props} />
      }}
    />
  )
}
