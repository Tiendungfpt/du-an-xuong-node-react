import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order'); // Thay đổi đường dẫn API nếu cần
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        // Call fetchOrders when component mounts
        fetchOrders();
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            <h2>Order List</h2>
            <ul className="order-list">
                {orders.map((order, index) => (
                    <li key={index} className="order-item">
                        <div className="order-header">
                            <p>Order ID: {order._id}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <div className="order-details">
                            <p>Customer Name: {order.customerInfo.name}</p>
                            <p>Customer Email: {order.customerInfo.email}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Products: ({order.items.length})</p>
                            <ul className="product-list">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="product-itemm">
                                        <p>Product Name: {item.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default OrderList;
