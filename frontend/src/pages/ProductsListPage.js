 import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom"
import { CREATE_PRODUCT_RESET } from '../constants'

function ProductsListPage() {
    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()

    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({ type: CREATE_PRODUCT_RESET })
    }, [dispatch])

    const showNothingMessage = () => {
        return (
            <div className="text-center mt-4">
                {!loading && <Message variant='info'>Nothing to show</Message>}
            </div>
        )
    }

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1].toLowerCase() : "")
    )

    return (
        
        
        <div className="container py-4" style={{ backgroundColor: "#e6f5e6", minHeight: "100vh" }}>
            {error && <Message variant='danger'>{error}</Message>}

            {loading && (
                <div className="d-flex align-items-center mb-4">
                    <h5 className="mb-0 text-success">Getting Products</h5>
                    <Spinner animation="border" variant="success" className="ml-3" />
                </div>
            )}

            <Row className="g-4">
                {filteredProducts.length === 0
                    ? showNothingMessage()
                    : filteredProducts.map((product, idx) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="p-3 bg-light rounded shadow-sm border border-success h-100" style={{ backgroundColor: '#fafff5' }}>
                                <Product product={product} />
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}

export default ProductsListPage
