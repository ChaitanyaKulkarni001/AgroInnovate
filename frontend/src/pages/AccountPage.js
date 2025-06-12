 import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
import Message from '../components/Message'
import { FaUserCircle, FaEnvelope, FaUserShield, FaEdit, FaTrash } from 'react-icons/fa'

function AccountPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const userDetailsReducer = useSelector(state => state.userDetailsReducer)
    const { user: userAccDetails, loading } = userDetailsReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            try {
                dispatch(checkTokenValidation())
                dispatch(userDetails(userInfo.id))
            } catch (error) {
                history.push("/")
            }
        }
    }, [history, userInfo, dispatch])

    const logoutHandler = () => {
        dispatch(logout())
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const renderData = () => {
        try {
            return (
                <Container className="py-5">
                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                        <Card.Header
                            className="text-white text-center py-4"
                            style={{
                                background: 'linear-gradient(to right, #2f9e44, #43c067)',
                                borderBottom: 'none'
                            }}
                        >
                            <FaUserCircle size={40} className="mb-2" />
                            <h3 className="mb-0">My Account</h3>
                            <p className="mb-0">Welcome, {userAccDetails?.username || 'Farmer'}!</p>
                        </Card.Header>
                        <Card.Body className="bg-light">
                            {loading ? (
                                <div className="d-flex align-items-center justify-content-center">
                                    <h5 className="text-muted">Loading...</h5>
                                    <Spinner animation="border" variant="success" className="ml-3" />
                                </div>
                            ) : (
                                <div className="px-2 px-md-5">
                                    <Row className="py-3 border-bottom">
                                        <Col xs={12} md={4} className="text-muted fw-bold">
                                            <FaUserCircle className="me-2 text-success" />
                                            Username:
                                        </Col>
                                        <Col>{userAccDetails.username}</Col>
                                    </Row>
                                    <Row className="py-3 border-bottom">
                                        <Col xs={12} md={4} className="text-muted fw-bold">
                                            <FaEnvelope className="me-2 text-success" />
                                            Email:
                                        </Col>
                                        <Col>{userAccDetails.email}</Col>
                                    </Row>
                                    <Row className="py-3 border-bottom">
                                        <Col xs={12} md={4} className="text-muted fw-bold">
                                            <FaUserShield className="me-2 text-success" />
                                            Admin Access:
                                        </Col>
                                        <Col>{userAccDetails.admin ? "Yes ✅" : "No ❌"}</Col>
                                    </Row>

                                    <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
                                        <Link to={`/account/update`}>
                                            <Button variant="success" className="d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm">
                                                <FaEdit /> Update Info
                                            </Button>
                                        </Link>
                                        <Link to={`/account/delete/`}>
                                            <Button variant="outline-danger" className="d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm">
                                                <FaTrash /> Delete Account
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            )
        } catch (error) {
            return (
                <Message variant='danger'>
                    Something went wrong. Go back to{" "}
                    <Link onClick={logoutHandler} to={`/login`}>Login</Link> page.
                </Message>
            )
        }
    }

    return renderData()
}

export default AccountPage
