 import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import { createProduct } from '../actions/productActions'
import { useHistory } from 'react-router'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

const ProductCreatePage = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState(null)

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const createProductReducer = useSelector(state => state.createProductReducer)
    const { product, success: productCreationSuccess, error: productCreationError } = createProductReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(checkTokenValidation())
    }, [dispatch, userInfo, history])

    const onSubmit = (e) => {
        e.preventDefault()
        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('stock', stock)
        form_data.append('image', image)
        dispatch(createProduct(form_data))
    }

    if (productCreationSuccess) {
        alert("Product successfully created.")
        history.push(`/product/${product.id}/`)
        dispatch({ type: CREATE_PRODUCT_RESET })
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <div style={{ backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '2rem' }}>
            {productCreationError && <Message variant='danger'>{productCreationError.image[0]}</Message>}

            <Card className="shadow border-0 p-4 mx-auto" style={{ maxWidth: '600px', borderRadius: '1rem', backgroundColor: '#f9fff9' }}>
                <h4 className="text-center text-success mb-4"><em>New Product</em></h4>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label><b>Product Name</b></Form.Label>
                        <Form.Control
                            required
                            autoFocus
                            type="text"
                            value={name}
                            placeholder="Enter product name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label><b>Product Description</b></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={description}
                            placeholder="Enter product description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label><b>Price</b></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            pattern="[0-9]+(\\.[0-9]{1,2})?%?"
                            value={price}
                            placeholder="e.g. 199.99"
                            step="0.01"
                            maxLength="8"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='stock' className="d-flex align-items-center">
                        <Form.Check
                            type="checkbox"
                            label="In Stock"
                            checked={stock}
                            onChange={() => setStock(!stock)}
                        />
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label><b>Product Image</b></Form.Label>
                        <Form.Control
                            required
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-4">
                        <Button type="submit" variant='success'>Save Product</Button>
                        <Button variant='outline-secondary' onClick={() => history.push("/")}>Cancel</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default ProductCreatePage