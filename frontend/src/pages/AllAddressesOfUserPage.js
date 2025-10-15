 import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Modal, Button, Spinner, Row, Col } from 'react-bootstrap'
import { deleteUserAddress, getAllAddress, checkTokenValidation, logout } from '../actions/userActions'
import { DELETE_USER_ADDRESS_RESET, GET_SINGLE_ADDRESS_RESET } from '../constants'
import { useHistory } from 'react-router-dom'
import CreateAddressComponent from '../components/CreateAddressComponent'

function AllAddressesOfUserPage() {
    let history = useHistory()
    const dispatch = useDispatch()

    const [deleteAddress, setDeleteAddress] = useState("")
    const [createAddress, setCreateAddress] = useState(false)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const getAllAddressesOfUserReducer = useSelector(state => state.getAllAddressesOfUserReducer)
    const { addresses, loading: loadingAllAddresses } = getAllAddressesOfUserReducer

    const deleteUserAddressReducer = useSelector(state => state.deleteUserAddressReducer)
    const { success: addressDeletionSuccess } = deleteUserAddressReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getAllAddress())
            dispatch({ type: GET_SINGLE_ADDRESS_RESET })
        }
    }, [dispatch, history, userInfo, addressDeletionSuccess])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    if (addressDeletionSuccess) {
        alert("Address successfully deleted.")
        dispatch({ type: DELETE_USER_ADDRESS_RESET })
        dispatch(getAllAddress())
    }

    const deleteAddressHandler = (address) => {
        setDeleteAddress(address)
        handleShow()
    }

    const confirmDelete = (id) => {
        dispatch(deleteUserAddress(id))
        handleClose()
    }

    const toggleCreateAddress = () => {
        setCreateAddress(!createAddress)
    }

    return (
        <div className="container mt-3">
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-warning text-dark">
                    <Modal.Title>
                        <i className="fas fa-exclamation-triangle"></i> Delete Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this address:
                    <br />
                    <strong>{deleteAddress.house_no}, {deleteAddress.city}, {deleteAddress.state}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => confirmDelete(deleteAddress.id)}>
                        Confirm Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <h3 className="text-success mb-3 text-center">Your Saved Addresses</h3>

            {loadingAllAddresses && (
                <div className="d-flex align-items-center justify-content-center mb-3">
                    <Spinner animation="border" variant="success" className="mr-2" />
                    <strong>Loading Addresses...</strong>
                </div>
            )}

            {createAddress ? (
                <CreateAddressComponent toggleCreateAddress={toggleCreateAddress} />
            ) : (
                <div className="text-center mb-3">
                    <Button variant="outline-success" onClick={toggleCreateAddress}>
                        <i className="fas fa-plus-circle"></i> Add New Address
                    </Button>
                </div>
            )}

            <Row>
                {addresses && !createAddress && addresses.map((address, idx) => (
                    <Col md={6} lg={4} key={idx} className="mb-4">
                        <Card className="shadow border-success h-100">
                            <Card.Body>
                                <Card.Title className="text-success">
                                    <i className="fas fa-map-marker-alt"></i> {address.name}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Phone:</strong> +91 {address.phone_number}<br />
                                    <strong>Address:</strong> {address.house_no}, near {address.landmark},<br />
                                    {address.city}, {address.state} - {address.pin_code}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="outline-primary" size="sm" onClick={() => history.push(`/all-addresses/${address.id}/`)}>
                                        <i className="fas fa-edit"></i> Edit
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => deleteAddressHandler(address)}>
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default AllAddressesOfUserPage
