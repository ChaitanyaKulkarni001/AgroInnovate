 import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap'
import { checkTokenValidation, getAllAddress, getSingleAddress, logout, updateUserAddress } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { UPDATE_USER_ADDRESS_RESET } from '../constants'
import { FaMapMarkerAlt, FaSave, FaArrowLeft } from 'react-icons/fa'

const AddressUpdatePage = ({ match }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
    const { address, error: errorFetchingAddress } = getSingleAddressReducer

    const updateUserAddressReducer = useSelector(state => state.updateUserAddressReducer)
    const { success: addressUpdateSuccess } = updateUserAddressReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getSingleAddress(match.params.id))
        }
    }, [dispatch, history, userInfo, match])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        const updatedAddress = {
            name,
            phone_number: phoneNumber,
            pin_code: pinCode,
            house_no: houseNumber,
            landmark,
            city,
            state,
        }
        dispatch(updateUserAddress(match.params.id, updatedAddress))
    }

    if (addressUpdateSuccess) {
        alert("Address updated successfully.")
        dispatch({ type: UPDATE_USER_ADDRESS_RESET })
        history.push("/all-addresses/")
        dispatch(getAllAddress())
    }

    return (
        <Row className="justify-content-md-center mt-4">
            <Col xs={12} md={8} lg={6}>
                <Card className="shadow rounded p-4 border-0">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <FaMapMarkerAlt size={28} className="text-info mb-2" />
                            <h4 className="fw-bold">Update Address</h4>
                        </div>

                        {errorFetchingAddress && (
                            <h5 className="text-danger text-center">Invalid Address Request</h5>
                        )}

                        {!address ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : (
                            <Form onSubmit={addressSubmitHandler}>
                                <Form.Group className="mb-3" controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        placeholder="Enter your name"
                                        defaultValue={address.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId='phoneNumber'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone number"
                                        pattern="[0-9]+"
                                        maxLength="10"
                                        defaultValue={address.phone_number}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId='pinCode'>
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Pin code"
                                        pattern="[0-9]+"
                                        maxLength="6"
                                        defaultValue={address.pin_code}
                                        onChange={(e) => setPinCode(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId='houseNumber'>
                                    <Form.Label>House No. / Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="House number or flat"
                                        defaultValue={address.house_no}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId='landmark'>
                                    <Form.Label>Landmark</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nearby landmark"
                                        defaultValue={address.landmark}
                                        onChange={(e) => setLandmark(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId='city'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        defaultValue={address.city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId='state'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="State"
                                        defaultValue={address.state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-flex flex-column gap-2">
                                    <Button type="submit" variant="success" className="d-flex align-items-center justify-content-center gap-2">
                                        <FaSave /> Save Changes
                                    </Button>

                                    <Button
                                        variant="outline-primary"
                                        onClick={() => history.push("/all-addresses/")}
                                        className="d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <FaArrowLeft /> Cancel
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default AddressUpdatePage
