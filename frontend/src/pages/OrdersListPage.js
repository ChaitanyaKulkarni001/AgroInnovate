 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidation, getAllOrders, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { Table, Spinner, Container } from 'react-bootstrap'
import { dateCheck } from '../components/GetDate'
import { changeDeliveryStatus } from '../actions/productActions'
import { CHANGE_DELIVERY_STATUS_RESET } from '../constants'
import SearchBarForOrdersPage from '../components/SearchBarForOrdersPage'
import Message from '../components/Message'

function OrdersListPage() {
    let history = useHistory()
    const dispatch = useDispatch()
    const placeholderValue = "Search orders by Customer Name, Address or by Ordered Item"

    const todays_date = dateCheck(new Date().toISOString().slice(0, 10))

    const [currentDateInfo] = useState(todays_date)
    const [idOfchangeDeliveryStatus, setIdOfchangeDeliveryStatus] = useState(0)
    const [cloneSearchTerm, setCloneSearchTerm] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const getAllOrdersReducer = useSelector(state => state.getAllOrdersReducer)
    const { orders, loading: loadingOrders } = getAllOrdersReducer

    const changeDeliveryStatusReducer = useSelector(state => state.changeDeliveryStatusReducer)
    const { success: deliveryStatusChangeSuccess, loading: deliveryStatusChangeSpinner } = changeDeliveryStatusReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getAllOrders())
        }
    }, [userInfo, dispatch, history])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const changeDeliveryStatusHandler = (id, status) => {
        setIdOfchangeDeliveryStatus(id)
        const productData = {
            "is_delivered": status,
            "delivered_at": status ? currentDateInfo : "Not Delivered"
        }
        dispatch(changeDeliveryStatus(id, productData))
    }

    if (deliveryStatusChangeSuccess) {
        alert("Delivery status changed successfully")
        dispatch({ type: CHANGE_DELIVERY_STATUS_RESET })
        dispatch(getAllOrders())
    }

    const handleSearchTerm = (term) => {
        setCloneSearchTerm(term)
    };

    return (
        <div style={{ backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <Container>
                <h3 className="text-success text-center mb-4">Order Management</h3>
                {loadingOrders && <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0 text-success">Getting Orders</h5>
                    <Spinner animation="border" variant="success" className="ml-3" />
                </div>}
                {userInfo.admin && <SearchBarForOrdersPage handleSearchTerm={handleSearchTerm} placeholderValue={placeholderValue} />}
                {orders.length > 0 ?
                    <div className="table-responsive mt-3">
                        <Table bordered hover responsive className="text-center bg-white shadow-sm rounded">
                            <thead className="bg-success text-white">
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer Name</th>
                                    <th>Card Used</th>
                                    <th>Delivery Address</th>
                                    <th>Ordered Item</th>
                                    <th>Paid Status</th>
                                    <th>Paid On</th>
                                    <th>Total Amount</th>
                                    <th>Delivered Status</th>
                                    <th>Delivered On</th>
                                    {userInfo.admin && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.filter((item) => (
                                    item.name.toLowerCase().includes(cloneSearchTerm) ||
                                    item.ordered_item.toLowerCase().includes(cloneSearchTerm) ||
                                    item.address.toLowerCase().includes(cloneSearchTerm)
                                )).map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.card_number}</td>
                                        <td>{order.address}</td>
                                        <td>{order.ordered_item}</td>
                                        <td>{order.paid_status ? <i className="fas fa-check-circle text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}</td>
                                        <td>{dateCheck(order.paid_at)}</td>
                                        <td>{order.total_price} INR</td>
                                        <td>{order.is_delivered ? <i className="fas fa-check-circle text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}</td>
                                        <td>{order.delivered_at}</td>
                                        {userInfo.admin && <td>
                                            {order.is_delivered ?
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => changeDeliveryStatusHandler(order.id, false)}>
                                                    {deliveryStatusChangeSpinner && idOfchangeDeliveryStatus === order.id ? <Spinner animation="border" size="sm" /> : "Mark Undelivered"}
                                                </button>
                                                :
                                                <button className="btn btn-outline-success btn-sm" onClick={() => changeDeliveryStatusHandler(order.id, true)}>
                                                    {deliveryStatusChangeSpinner && idOfchangeDeliveryStatus === order.id ? <Spinner animation="border" size="sm" /> : "Mark Delivered"}
                                                </button>}
                                        </td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    : <Message variant="info">No orders yet.</Message>}
            </Container>
        </div>
    )
}

export default OrdersListPage;