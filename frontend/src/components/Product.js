import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCompare, addToCart } from '../actions/productActions'
import '../styles/AmazonStyle.css'

function Product({ product }) {
    const dispatch = useDispatch()

    const onCompare = () => {
        dispatch(addToCompare(product))
    }

    const onAddToCart = () => {
        dispatch(addToCart(product, 1))
    }

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="product-card-image-container">
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-card-image"
                    />
                </div>
            </Link>
            
            <div className="product-card-body">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-card-title">
                        {product.name}
                    </h3>
                </Link>

                {product.rating && (
                    <div className="product-rating">
                        <span className="product-stars">★★★★☆</span>
                        <span className="product-rating-count">
                            {product.rating}
                        </span>
                    </div>
                )}

                <div className="product-price">
                    <span className="product-price-symbol">₹</span>
                    {product.price}
                </div>

                <div className="product-buttons">
                    <button 
                        className="btn-amazon-secondary" 
                        onClick={onAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button 
                        className="btn-amazon-outline" 
                        onClick={onCompare}
                    >
                        Add to Compare
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product
