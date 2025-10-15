// src/components/NavBar.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import SearchBarForProducts from './SearchBarForProducts';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();


  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
    window.location.reload();
  };

  // Change language handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // i18next-browser-languagedetector will cache in localStorage/cookie automatically
    // Optionally, call backend to save preference if desired.
  };

  // Get current language code ('en', 'hi', 'mr', etc.)
  const currentLang = i18n.language || 'en';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <Navbar
        expand="lg"
        style={{
          background: 'linear-gradient(to right,rgb(3, 76, 5), #8BC34A)',
          borderBottom: '3px solid #3e8e41',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '0.75rem 0',
          margin: 0
        }}
        variant="dark"
      >
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
          <LinkContainer to="/">
            <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
              <i className="fas fa-tractor mr-2"></i> AgroCart
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              <LinkContainer to="/">
                <Nav.Link className="mx-1" style={{ fontSize: '0.95rem' }}>
                  <i className="fas fa-seedling"></i> {t('all_products')}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/compare">
                <Nav.Link className="mx-1" style={{ fontSize: '0.95rem' }}>
                  <i className="fas fa-balance-scale"></i> Compare
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className="mx-1" style={{ fontSize: '0.95rem' }}>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/harvest-calendar">
                <Nav.Link className="mx-1" style={{ fontSize: '0.95rem' }}>
                  <i className="fas fa-calendar-alt"></i> Calendar
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.admin && (
                <LinkContainer to="/new-product/">
                  <Nav.Link className="mx-1" style={{ fontSize: '0.95rem' }}>
                    <i className="fas fa-plus-circle"></i> {t('add_product')}
                  </Nav.Link>
                </LinkContainer>
              )}

              <div className="mx-2" style={{ width: '250px' }}>
                <SearchBarForProducts />
              </div>
            </Nav>

            <Nav className="align-items-center">
              {/* Google Translate Widget with Label */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginLeft: '10px',
                marginRight: '10px'
              }}>
                <span style={{ 
                  color: 'white', 
                  fontSize: '14px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}>
                  Language:
                </span>
                <div id="google_translate_element"></div>
              </div>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user-circle"></i> {userInfo.username}
                    </span>
                  }
                  id="username"
                  align="end"
                  className="text-capitalize"
                >
                  <LinkContainer to="/account">
                    <NavDropdown.Item>
                      <i className="fas fa-cog"></i> {t('account_settings')}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/all-addresses/">
                    <NavDropdown.Item>
                      <i className="fas fa-map-marked-alt"></i> {t('address_settings')}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/stripe-card-details/">
                    <NavDropdown.Item>
                      <i className="fas fa-credit-card"></i> {t('card_settings')}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/all-orders/">
                    <NavDropdown.Item>
                      <i className="fas fa-box-open"></i> {t('all_orders')}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i> {t('logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="mx-2">
                      <i className="fas fa-sign-in-alt"></i> {t('login')}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="mx-2">
                      <i className="fas fa-user-plus"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
}

export default NavBar;
