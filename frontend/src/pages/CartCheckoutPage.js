import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation } from '../actions/userActions'
import { CHARGE_CARD_RESET } from '../constants/index'

const CartCheckoutPage = () => {
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

    const createCardReducer = useSelector(state => state.createCardReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = createCardReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards } = savedCardsListReducer

    // Get cart items
    const { items = [] } = useSelector(state => state.cartReducer || {})
    
    // Calculate total
    const total = items.reduce((acc, it) => acc + (Number(it.price) * (it.qty || 1)), 0)

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else if (items.length === 0) {
            history.push("/cart")
        } else {
            dispatch(checkTokenValidation())
            dispatch(savedCardsList())
            dispatch({ type: CHARGE_CARD_RESET })
        }
    }, [dispatch, history, success, userInfo, items.length])

    if (tokenError) {
        return <Message variant="danger">{tokenError}</Message>
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h4 className="text-success mb-3">Checkout Summary</h4>
                    <Card className="mb-3">
                        <Card.Body>
                            <h5 className="mb-3">Cart Items ({items.length})</h5>
                            {items.map((item, index) => (
                                <div key={item.id || index} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                                    <div>
                                        <strong>{item.name}</strong>
                                        <br />
                                        <small className="text-muted">Qty: {item.qty || 1} × ₹ {item.price}</small>
                                    </div>
                                    <div className="text-right">
                                        <strong>₹ {(Number(item.price) * (item.qty || 1)).toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                <h5>Total Amount</h5>
                                <h5 className="text-success">₹ {total.toFixed(2)}</h5>
                            </div>
                        </Card.Body>
                    </Card>

                    <UserAddressComponent handleAddressId={handleAddressId} />
                </Col>

                <Col md={6}>
                    <h4 className="text-success mb-3">Payments Section</h4>
                    <CreateCardComponent addressSelected={addressSelected} stripeCards={stripeCards} />

                    {cardCreationError && <Message variant='danger'>{cardCreationError}</Message>}

                    {success && stripeCards && stripeCards.length > 0 ? (
                        <Card className="mt-3">
                            <Card.Header>Saved card</Card.Header>
                            <Card.Body>
                                {stripeCards.map((card) => (
                                    <div key={card.id} className="mb-3">
                                        <strong>Card Number:</strong> XXXX XXXX XXXX {card.card_number ? card.card_number.slice(12, 16) : 'XXXX'}
                                        <br />
                                        {/* For cart checkout, we'll use a simplified payment with total amount */}
                                        <ChargeCardComponent
                                            addressSelected={addressSelected}
                                            selectedAddressId={selectedAddressId}
                                            product={{ name: 'Cart Items', price: total }}
                                        />
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    ) : (
                        success ? <Message variant='info' className="mt-3">No saved cards available. Please add a card above.</Message> : null
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default CartCheckoutPage

