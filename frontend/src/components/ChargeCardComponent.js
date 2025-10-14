import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Form, Button, Card, InputGroup } from 'react-bootstrap'
import { chargeCustomer } from '../actions/cardActions'
import { Link, useHistory } from "react-router-dom";
import { getSingleAddress } from '../actions/userActions'
import { clearCart } from '../actions/productActions'
import Message from './Message'
import axios from 'axios'
import FakeRazorpayModal from './FakeRazorpayModal'


const ChargeCardComponent = ({ product, match, selectedAddressId, addressSelected }) => {

    let history = useHistory()
    const dispatch = useDispatch()

    // create card reducer (may be undefined if not using saved card)
    const createCardReducer = useSelector(state => state.createCardReducer)
    const { cardData } = createCardReducer || {}

    // charge card reducer
    const chargeCardReducer = useSelector(state => state.chargeCardReducer)
    const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus } = chargeCardReducer

    // get single address reducer    
    const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
    const { address } = getSingleAddressReducer

    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(null)
    const [promoError, setPromoError] = useState('')
    const [showRazorpay, setShowRazorpay] = useState(false)

    useEffect(() => {
        dispatch(getSingleAddress(selectedAddressId))
    }, [dispatch, match, selectedAddressId])

    const applyPromo = async () => {
        setPromoError('')
        try {
            const { data } = await axios.post('/payments/validate-promo/', { code: promoCode })
            if (data.valid) {
                setPromoApplied(data)
            } else {
                setPromoApplied(null)
                setPromoError('Invalid promo code')
            }
        } catch (e) {
            setPromoApplied(null)
            setPromoError('Failed to validate promo')
        }
    }

    const computePayable = () => {
        const base = Number(product.price)
        const discount = promoApplied ? (base * (promoApplied.discount_percent || 0) / 100) : 0
        return Math.max(0, base - discount)
    }

    const openRazorpay = async () => {
        try { await axios.post('/payments/mock-razorpay-order/', { amount: computePayable() }) } catch {}
        setShowRazorpay(true)
    }

    const onRazorpayResult = (success) => {
        setShowRazorpay(false)
        if (success) {
            submitPayment()
        }
    }

    // charge card handler (simulate payment)
    const submitPayment = () => {
        const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, 
        ${address.state}, ${address.pin_code}`
        const data = {
            "email": (cardData && cardData.email) || undefined,
            "source": (cardData && cardData.id) || undefined,
            "amount": computePayable(),
            "name": address.name,
            "card_number": (cardData && cardData.card_data && cardData.card_data.last4) || '0000',
            "address": address_detail,
            "ordered_item": product.name,
            "paid_status": true,
            "total_price": computePayable(),
            "is_delivered": false,
            "delivered_at": "Not Delivered",
        }
        dispatch(chargeCustomer(data))
    }

    if (chargeSuccessfull) {
        // Clear cart after successful payment from cart checkout
        const isCartCheckout = product && product.name === 'Cart Items'
        if (isCartCheckout) {
            dispatch(clearCart())
        }
        
        history.push({
            pathname: '/payment-status/',
            state: { detail: product }
        })
        window.location.reload()
    }

    return (
        <div>
            {chargeError ? <Message variant="danger">{chargeError}</Message> : ""}
            <span className="text-info">
                <h5>Confirm payment</h5>
            </span>

            <InputGroup className="mb-2">
                <Form.Control placeholder='Promo code' value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} />
                <Button variant='outline-success' onClick={applyPromo}>Apply</Button>
            </InputGroup>
            {promoApplied && <div className='text-success small'>Applied {promoApplied.code}: {promoApplied.discount_percent}% off</div>}
            {promoError && <div className='text-danger small'>{promoError}</div>}

            <div className='mb-2'><strong>Payable:</strong> ₹{computePayable()}</div>

            <Form onSubmit={(e)=>{e.preventDefault(); openRazorpay();}}>

                {chargingStatus ?
                    <Button variant="primary" disabled style={{ width: "100%" }}>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {" "}Processing Payment...
                    </Button>
                    :
                    <Button variant="primary" type="submit" style={{ width: "100%" }}>
                        Pay with Razorpay (Demo)
                    </Button>
                }
            </Form>

            <Card
                className="p-2 mt-2 mb-2"
                style={{ border: "1px solid", borderColor: "#C6ACE7" }}
            >
                {address ?
                    <div>
                        <span className="text-info">
                            <b><em>Will be delievered at this address</em></b>
                        </span>
                        <p></p>
                        <p><b>Name: </b>{address ? address.name : ""}</p>
                        <p><b>Phone Number: </b>{address ? address.phone_number : ""}</p>
                        <p><b>House Number: </b>{address ? address.house_no : ""}</p>
                        <p><b>Landmark: </b>{address ? address.landmark : ""}</p>
                        <p><b>City: </b>{address ? address.city : ""}</p>
                        <p><b>State: </b>{address ? address.state : ""}</p>
                        <p><b>Pin Code/Zip Code: </b>{address ? address.pin_code : ""}</p>
                    </div>
                    :
                    ""
                }
            </Card>
            <Link to="#" onClick={() => window.location.reload()}>Select a different card to pay</Link>

            <FakeRazorpayModal open={showRazorpay} amount={computePayable()} onClose={()=>setShowRazorpay(false)} onConfirm={onRazorpayResult} />
        </div >
    )
}

export default ChargeCardComponent
