 import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useHistory } from "react-router-dom";
import SearchBarForProducts from './SearchBarForProducts'

function NavBar() {

    let history = useHistory()
    const dispatch = useDispatch()

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const logoutHandler = () => {
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <header>
            <Navbar
                expand="lg"
                style={{
                    background: 'linear-gradient(to right, #4CAF50, #8BC34A)',
                    borderBottom: '4px solid #3e8e41',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                variant="dark"
                className="py-3"
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                            <i className="fas fa-tractor mr-2"></i>AgroCart
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto align-items-center">

                            <LinkContainer to="/">
                                <Nav.Link className="mx-2">
                                    <i className="fas fa-seedling"></i> All Products
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo && userInfo.admin &&
                                <LinkContainer to="/new-product/">
                                    <Nav.Link className="mx-2">
                                        <i className="fas fa-plus-circle"></i> Add Product
                                    </Nav.Link>
                                </LinkContainer>
                            }

                            <div className="mx-2" style={{ width: '300px' }}>
                                <SearchBarForProducts />
                            </div>
                        </Nav>

                        <Nav className="align-items-center">
                            {userInfo ? (
                                <NavDropdown
                                    title={<span><i className="fas fa-user-circle"></i> {userInfo.username}</span>}
                                    id='username'
                                    align="end"
                                    className="text-capitalize"
                                >
                                    <LinkContainer to="/account">
                                        <NavDropdown.Item><i className="fas fa-cog"></i> Account Settings</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/all-addresses/">
                                        <NavDropdown.Item><i className="fas fa-map-marked-alt"></i> Address Settings</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/stripe-card-details/">
                                        <NavDropdown.Item><i className="fas fa-credit-card"></i> Card Settings</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/all-orders/">
                                        <NavDropdown.Item><i className="fas fa-box-open"></i> All Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="mx-2">
                                        <i className="fas fa-sign-in-alt"></i> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar
