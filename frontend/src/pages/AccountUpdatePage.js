 import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, userUpdateDetails, checkTokenValidation, logout } from '../actions/userActions'
import Message from '../components/Message'
import { UPDATE_USER_DETAILS_RESET } from '../constants'
import { FaUserEdit, FaSave, FaArrowLeft } from 'react-icons/fa'

function AccountUpdatePage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
  const { error: tokenError } = checkTokenValidationReducer

  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  const userDetailsReducer = useSelector(state => state.userDetailsReducer)
  const { user: userAccDetails, loading } = userDetailsReducer

  const userDetailsUpdateReducer = useSelector(state => state.userDetailsUpdateReducer)
  const { success } = userDetailsUpdateReducer

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(checkTokenValidation())
      dispatch(userDetails(userInfo.id))
    }
  }, [dispatch, history, userInfo])

  if (userInfo && tokenError === "Request failed with status code 401") {
    alert("Session expired, please login again.")
    dispatch(logout())
    history.push("/login")
    window.location.reload()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const updatedUsername = username === "" ? userAccDetails.username : username
    const updatedEmail = email === "" ? userAccDetails.email : email

    if (password !== confirmPassword) {
      alert("Passwords do not match")
    } else {
      const userData = {
        username: updatedUsername,
        email: updatedEmail,
        password: password,
      }
      dispatch(userUpdateDetails(userData))
    }
  }

  if (success) {
    alert("Account successfully updated.")
    dispatch({ type: UPDATE_USER_DETAILS_RESET })
    history.push("/account/")
    dispatch(userDetails(userInfo.id))
  }

  const logoutHandler = () => {
    history.push("/login")
    dispatch(logout())
  }

  const renderData = () => {
    try {
      return (
        <Row className='justify-content-md-center mt-5'>
          <Col xs={12} md={8} lg={6}>
            <Card className='shadow rounded p-4 border-0'>
              <Card.Body>
                <div className='text-center mb-4'>
                  <FaUserEdit size={28} className="text-success mb-2" />
                  <h4 className='fw-bold'>Update Account</h4>
                  <p className='text-muted'>Modify your details below</p>
                </div>

                {loading && (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}

                <Form onSubmit={onSubmit}>
                  <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      defaultValue={userAccDetails.username}
                      placeholder="Enter username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={userAccDetails.email}
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className='d-flex justify-content-between'>
                    <Button type="submit" variant='success' className="d-flex align-items-center gap-2">
                      <FaSave /> Save Changes
                    </Button>

                    <Link to={`/account`}>
                      <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                        <FaArrowLeft /> Cancel
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    } catch (error) {
      return (
        <Message variant='danger'>
          Something went wrong, go back to{' '}
          <Link onClick={logoutHandler} to={`/login`}>Login</Link> page.
        </Message>
      )
    }
  }

  return renderData()
}

export default AccountUpdatePage
