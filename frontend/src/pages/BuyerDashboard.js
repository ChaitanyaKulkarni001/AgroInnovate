import React from 'react'
import { Link } from 'react-router-dom'

export default function BuyerDashboard() {
  return (
    <div>
      <h3>Buyer Dashboard</h3>
      <ul>
        <li><Link to="/">Browse Products</Link></li>
        <li><Link to="/compare">Compare</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/all-orders/">Your Orders</Link></li>
      </ul>
    </div>
  )
}
