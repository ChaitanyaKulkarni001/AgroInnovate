import React from 'react'
import { Link } from 'react-router-dom'

export default function FarmerDashboard() {
  return (
    <div>
      <h3>Farmer Dashboard</h3>
      <ul>
        <li><Link to="/new-product/">Add Product</Link></li>
        <li><Link to="/all-orders/">View Orders</Link></li>
        <li><Link to="/harvest-calendar">Harvest Calendar</Link></li>
      </ul>
    </div>
  )
}
