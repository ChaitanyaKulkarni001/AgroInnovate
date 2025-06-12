 import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProductDetails, updateProduct } from '../actions/productActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { UPDATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

const ProductUpdatePage = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading: loadingPageDetails, product } = productDetailsReducer

    const updateProductReducer = useSelector(state => state.updateProductReducer)
    const { success, loading: loadingUpdate, error } = updateProductReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState("")
    const [newImage, setNewImage] = useState(false)

    useEffect(() => {
        if (!userInfo || !userInfo.admin) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, userInfo, history, match])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
        }
    }, [product])

    const submitHandler = (e) => {
        e.preventDefault()
        const productId = product.id
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('stock', stock)
        if (newImage && image) formData.append('image', image)
        dispatch(updateProduct(productId, formData))
    }

    if (success) {
        alert("Product successfully updated.")
        dispatch({ type: UPDATE_PRODUCT_RESET })
        history.push(`/product/${product.id}`)
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h3 className="text-success text-center mb-4">Edit Product</h3>

                    {error && <Message variant='danger'>{error.image ? error.image[0] : error}</Message>}
                    {loadingPageDetails && <Spinner animation="border" className="d-block mx-auto" />}
                    {loadingUpdate && <Spinner animation="border" className="d-block mx-auto" />}

                    {!loadingPageDetails && product && (
                        <Form onSubmit={submitHandler} className="shadow p-4 rounded bg-white">
                            <Form.Group controlId='image'>
                                <Form.Label><b>Product Image</b></Form.Label>
                                <div className="mb-3">
                                    <img src={product.image} alt={product.name} height="200" />
                                </div>
                                {newImage ? (
                                    <>
                                        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        <Button
                                            variant="secondary"
                                            className="mt-2"
                                            onClick={() => {
                                                setNewImage(false)
                                                setImage("")
                                                dispatch({ type: UPDATE_PRODUCT_RESET })
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={() => setNewImage(true)}
                                    >
                                        Choose different image
                                    </Button>
                                )}
                            </Form.Group>

                            <Form.Group controlId='name'>
                                <Form.Label><b>Product Name</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Product name"
                                />
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label><b>Product Description</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Product description"
                                />
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label><b>Price</b></Form.Label>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="199.99"
                                    step="0.01"
                                />
                            </Form.Group>

                            <Form.Group controlId='stock'>
                                <Form.Check
                                    type="checkbox"
                                    label="In Stock"
                                    checked={stock}
                                    onChange={() => setStock(!stock)}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between mt-4">
                                <Button type="submit" variant='success'>Save Changes</Button>
                                <Button variant='secondary' onClick={() => history.push(`/product/${product.id}`)}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProductUpdatePage