import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch } from 'react-redux'
import { createCard } from '../actions/cardActions'

const StripeCardForm = ({ email, saveCard, addressSelected }) => {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return

        if (!addressSelected) {
            alert("Please select or add your Address to continue")
            return
        }

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: email
            }
        })

        if (error) {
            console.error(error)
            alert(error.message)
        } else {
            // Dispatch your action to send paymentMethod.id to backend
            dispatch(createCard({
                payment_method_id: paymentMethod.id,
                email: email,
                saveCard: saveCard
            }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                <CardElement />
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={() => {}}
                    readOnly
                />
                Save card for future
            </label>
            <button type="submit" className="btn btn-primary mt-2">
                Submit Card
            </button>
        </form>
    )
}

export default StripeCardForm
