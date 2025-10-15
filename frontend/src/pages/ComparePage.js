import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { removeFromCompare, clearCompare, addToCart } from '../actions/productActions'

const headers = ['Image', 'Name', 'Price', 'Category', 'Crop Type', 'Quality', 'Rating', 'Seller']

export default function ComparePage() {
  const dispatch = useDispatch()
  const { items = [] } = useSelector(state => state.compareReducer || {})

  const onRemove = (id) => dispatch(removeFromCompare(id))
  const onClear = () => dispatch(clearCompare())
  const onAddToCart = (p) => dispatch(addToCart(p, 1))

  const pad = [...items]
  while (pad.length < 3) pad.push(null)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Compare Products</h4>
        <Button variant="outline-danger" size="sm" onClick={onClear}>Clear</Button>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Attribute</th>
            {pad.map((p, i) => (<th key={i}>{p ? p.name : '—'}</th>))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Image', (p)=> p && <img src={p.image} alt={p.name} height={80} />],
            ['Name', (p)=> p && p.name],
            ['Price', (p)=> p && `₹ ${p.price}`],
            ['Category', (p)=> p && (p.category || '-')],
            ['Crop Type', (p)=> p && (p.crop_type || '-')],
            ['Quality', (p)=> p && (p.quality || '-')],
            ['Rating', (p)=> p && (p.rating ?? '-')],
            ['Seller', (p)=> p && (p.seller || '-')],
          ].map(([label, render]) => (
            <tr key={label}>
              <td><strong>{label}</strong></td>
              {pad.map((p, i) => (<td key={i}>{render(p)}</td>))}
            </tr>
          ))}
          <tr>
            <td></td>
            {pad.map((p, i) => (
              <td key={i}>
                {p && (
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="success" onClick={()=>onAddToCart(p)}>Add to Cart</Button>
                    <Button size="sm" variant="outline-danger" onClick={()=>onRemove(p.id)}>Remove</Button>
                  </div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
