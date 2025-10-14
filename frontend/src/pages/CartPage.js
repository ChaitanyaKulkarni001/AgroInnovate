import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { removeFromCart, clearCart } from '../actions/productActions'
import { useHistory } from 'react-router-dom'

export default function CartPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { items = [] } = useSelector(state => state.cartReducer || {})

  const total = items.reduce((acc, it) => acc + (Number(it.price) * (it.qty || 1)), 0)

  const goToCheckout = () => {
    if (items.length > 0) {
      // navigate to first product checkout as demo
      history.push(`/product/${items[0].id}/checkout/`)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Your Cart</h4>
        <div>
          <Button variant="success" className='mr-2' onClick={goToCheckout} disabled={items.length===0}>Proceed to Payment</Button>
          <Button variant="outline-danger" size="sm" onClick={()=>dispatch(clearCart())}>Clear</Button>
        </div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.qty || 1}</td>
              <td>₹ {p.price}</td>
              <td>₹ {Number(p.price) * (p.qty || 1)}</td>
              <td><Button size="sm" variant="outline-danger" onClick={()=>dispatch(removeFromCart(p.id))}>Remove</Button></td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="text-right"><strong>Total</strong></td>
            <td colSpan={2}><strong>₹ {total.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
