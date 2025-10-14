import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'

function RegisterPage({ history, variant }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const [role, setRole] = useState('BUYER')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')

    const dispatch = useDispatch()

    // reducer
    const userRegisterReducer = useSelector(state => state.userRegisterReducer)
    const { error, userInfo } = userRegisterReducer

    useEffect(() => {
        if (userInfo) {
            const r = userInfo.role || (userInfo.user && userInfo.user.role)
            if (r === 'FARMER') history.push('/farmer')
            else history.push('/buyer')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(username, email, password, {
                role,
                phone_number: phone,
                address_line: address,
                city,
                state,
                pincode,
            }))
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <Row className='justify-content-md-center'>
                <Col xs={12} md={12}>
                    <h1>Sign Up</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler} className="space-y-3">

                        <Form.Group controlId='name'>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>
                                Email Address
                            </Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='role'>
                            <Form.Label>Role</Form.Label>
                            <Form.Control as='select' value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value='BUYER'>Buyer</option>
                                <option value='FARMER'>Farmer</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='optional' />
                        </Form.Group>
                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='optional' />
                        </Form.Group>
                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} placeholder='optional' />
                        </Form.Group>
                        <Form.Group controlId='state'>
                            <Form.Label>State</Form.Label>
                            <Form.Control value={state} onChange={(e)=>setState(e.target.value)} placeholder='optional' />
                        </Form.Group>
                        <Form.Group controlId='pincode'>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder='optional' />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant='primary' className='w-full'>Sign Up</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            Already have an account?
                    <Link
                                to={`/login`}
                            > Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default RegisterPage