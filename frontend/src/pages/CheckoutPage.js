 import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Container, Image, Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CHARGE_CARD_RESET } from '../constants/index'

const CheckoutPage = ({ match }) => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [addressSelected, setAddressSelected] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(0)

    const handleAddressId = (id) => {
        if (id) setAddressSelected(true)
        setSelectedAddressId(id)
    }

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const createCardReducer = useSelector(state => state.createCardReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = createCardReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards } = savedCardsListReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
            dispatch(savedCardsList())
            dispatch({ type: CHARGE_CARD_RESET })
        }
    }, [dispatch, match, history, success, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <div style={{ backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <Container>
                {cardCreationError && <Message variant='danger'>{cardCreationError}</Message>}
                {loading && <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0 text-success">Getting Checkout Info</h5>
                    <Spinner animation="border" variant="success" className="ml-3" />
                </div>}
                {cardCreationLoading && <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0 text-success">Checking your card</h5>
                    <Spinner animation="border" variant="success" className="ml-3" />
                </div>}
                {error ? <Message variant='danger'>{error}</Message> :
                    <Row>
                        <Col md={6}>
                            <h3 className="text-success">Checkout Summary</h3>
                            <Card className="mb-4 shadow-sm">
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Image src={product.image} alt="image" height="180" rounded fluid />
                                            </Col>
                                            <Col>
                                                <h5 className="text-capitalize">{product.name}</h5>
                                                <span className="text-success font-weight-bold">₹ {product.price}</span>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>

                            <div className="d-flex align-items-center mb-2">
                                <h4 className="text-success mb-0">Billing Address</h4>
                                <Link to="/all-addresses/" className="ml-3">Edit/Add Address</Link>
                            </div>
                            <UserAddressComponent handleAddressId={handleAddressId} />
                        </Col>
                        <Col md={6}>
                            <h3 className="text-success">Payments Section</h3>
                            {success ?
                                <ChargeCardComponent selectedAddressId={selectedAddressId} addressSelected={addressSelected} product={product} />
                                :
                                <CreateCardComponent addressSelected={addressSelected} stripeCards={stripeCards} />
                            }
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    )
}

export default CheckoutPage;