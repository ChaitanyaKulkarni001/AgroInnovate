 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET } from '../constants'

function ProductDetailsPage({ history, match }) {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const deleteProductReducer = useSelector(state => state.deleteProductReducer)
    const { success: productDeletionSuccess } = deleteProductReducer

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch({ type: UPDATE_PRODUCT_RESET })
        dispatch({ type: CREATE_PRODUCT_RESET })
        dispatch({ type: CARD_CREATE_RESET })
    }, [dispatch, match])

    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleClose()
    }

    if (productDeletionSuccess) {
        alert("Product successfully deleted.")
        history.push("/")
        dispatch({ type: DELETE_PRODUCT_RESET })
    }

    return (
        <div style={{ backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>
                        {" "}Delete Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product <em>"{product.name}"</em>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => confirmDelete()}>Confirm Delete</Button>
                    <Button variant="outline-success" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {loading && (
                <div className="d-flex align-items-center mb-4">
                    <h5 className="mb-0 text-success">Getting Product Details</h5>
                    <Spinner animation="border" variant="success" className="ml-3" />
                </div>
            )}

            {error ? <Message variant='danger'>{error}</Message> : (
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} className="mb-4">
                            <Card className="shadow border-0 p-2" style={{ borderRadius: '1rem' }}>
                                <Card.Img variant="top" src={product.image} height="420" style={{ objectFit: 'cover', borderRadius: '0.75rem' }} />
                                {userInfo && userInfo.admin && (
                                    <div className="d-flex mt-3">
                                        <Button variant="danger" className="w-50 mr-2" onClick={handleShow}>Delete</Button>
                                        <Button variant="outline-success" className="w-50" onClick={() => history.push(`/product-update/${product.id}/`)}>Edit</Button>
                                    </div>
                                )}
                            </Card>
                        </Col>

                        <Col md={8} className="mb-4">
                            <Card className="p-4 shadow-sm border-0" style={{ backgroundColor: '#f6fff6', borderRadius: '1rem' }}>
                                <h3 className="text-success font-weight-bold mb-3 text-center">{product.name}</h3>
                                <hr />
                                <h5 className="text-success text-center mb-3">Price: ₹ {product.price}</h5>
                                <hr />
                                <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6', fontSize: '1rem' }}>{product.description}</p>
                            </Card>
                        </Col>

                        <Col md={8} className="mb-4">
                            <Card className="p-4 shadow-sm border-0 text-center" style={{ backgroundColor: '#edffed', borderRadius: '1rem' }}>
                                <h4 className="text-success mb-3">Buy Now</h4>
                                <hr />
                                {product.stock ? (
                                    <Link to={`${product.id}/checkout/`}>
                                        <Button variant="success" className="w-100">Pay with Stripe</Button>
                                    </Link>
                                ) : (
                                    <Message variant='danger'>Out Of Stock!</Message>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}

export default ProductDetailsPage
