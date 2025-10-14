import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCompare, addToCart } from '../actions/productActions'

function Product({ product }) {
    const dispatch = useDispatch()

    const onCompare = () => {
        dispatch(addToCompare(product))
    }

    const onAddToCart = () => {
        dispatch(addToCart(product, 1))
    }

    return (
        <div>
            <Card className="mb-4 rounded shadow card-hover transition">

                <Card.Body>
                <Link to={`/product/${product.id}`} className="block">
                    <Card.Img variant="top" src={product.image} height="162" className="object-cover w-full rounded" />
                </Link>
                    <Link to={`/product/${product.id}`} className="no-underline">
                        <Card.Title as="div" className="mt-2">
                            <strong className="text-gray-800">{product.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as="div" className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-green-700">₹ {product.price}</span>
                        {product.rating && <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">★ {product.rating}</span>}
                    </Card.Text>

                    <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline-success" onClick={onCompare}>Add to Compare</Button>
                        <Button size="sm" variant="success" onClick={onAddToCart}>Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
