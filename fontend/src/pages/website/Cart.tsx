import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import Service from './Service'
import { debounce, reduce } from 'lodash'
import { ChangeEvent, useState } from 'react'
import { useLocalStorage } from '../../common/hooks/useStorage'




const Cart = () => {
    const queryClient = useQueryClient();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;

    // const [editQuantity, setEditQuantity] = useState({} as any);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["cart", userId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/cart/${userId}`);
            return data
        },
    });
    const updateQuantityDebounce = debounce(async (productId, quantity: number) => {
        await axios.post(`http://localhost:8080/api/cart/update`, {
            userId,
            productId,
            quantity
        });
        queryClient.invalidateQueries({
            queryKey: ["cart", userId]
        })
    }, 600)

    const handleQuantityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value <= 0) {
            e.target.value = ''; // Xóa giá trị nếu là số 0 hoặc âm
        }

        const quantity = parseInt(e.target.value);
        updateQuantityDebounce(productId, quantity)
        // setEditQuantity({
        //     ...editQuantity,
        //     [productId]: quantity,
        // });
    };
    const removeMutation = useMutation({
        mutationFn: async (productId) => {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
            if (confirmDelete) {
                const { data } = await axios.post(`http://localhost:8080/api/cart/remove`, {
                    userId,
                    productId,
                });
                return data;
            } else {
                return Promise.reject("Hủy xóa sản phẩm");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });
        },
    });

    const incrementMutation = useMutation({
        mutationFn: async (productId) => {
            const { data } = await axios.post(`http://localhost:8080/api/cart/increase`, {
                userId,
                productId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            })
        },
    });

    const decrementMutation = useMutation({
        mutationFn: async (productId) => {
            await axios.post(`http://localhost:8080/api/cart/decrease`, {
                userId,
                productId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            })
        },
    });



    const calculateTotal = () => {
        if (!data || !data.products) return 0;
        return reduce(
            data.products,
            (total, product) => total + product.price * product.quantity,
            0
        );
    }
    if (isLoading) return <p>...Loading</p>
    if (isError) return <p>Error</p>

    return (
        <>
            <section className="banner">
                <div className="banner-img">
                    <img src="./img/banner-cart.png" className="banner__img" />
                </div>

            </section>

            <section className="cart">
                <div className="container">
                    <div className="cart-product">
                        <div className="cart-product-left">
                            <div className="cart-product-table">
                                <table className="cart-product-table-form">
                                    <thead className="cart-product-table-head">
                                        <tr>
                                            <th style={{ width: 150 }}>Image</th>
                                            <td style={{ width: 200 }}><strong>Product</strong></td>
                                            <td style={{ width: 140 }}><strong>Price</strong></td>
                                            <td style={{ width: 150 }}><strong>Quantity</strong></td>
                                            <td style={{ width: 150 }}><strong>Subtotal</strong></td>
                                            <td style={{ width: 50 }} />
                                        </tr></thead>
                                    <tbody className="cart-product-table-body">
                                        {data && data?.products.map((product: any, index: number) => {
                                            return (
                                                <tr>
                                                    <td><img className="cart-product-table-imgpro" src={product.image} alt="" /></td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price} $</td>
                                                    <td>
                                                        <div className="quantity-control">
                                                            <button className="increment-btn" onClick={() => incrementMutation.mutate(product.productId)}>+</button>
                                                            {product.quantity}
                                                            <input type="number" className='quantity-input' min="1" onInput={(e) => handleQuantityChange(product.productId, e)} />
                                                            <button onClick={() => decrementMutation.mutate(product.productId)}>−</button>
                                                        </div>

                                                    </td>
                                                    <td>{product.price * product.quantity} $</td>
                                                    <td>
                                                        <div className='quantity-control-remove'>
                                                            <button onClick={() => removeMutation.mutate(product.productId)}><img src="./img/icontable.svg" alt="" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="cart-product-right">
                            <h3>Cart Totals</h3>
                            <div className="cart-product-price">
                                <div className="cart-product-price__left">
                                    <p>Subtotal</p>
                                    <span>Total</span>
                                </div>
                                <div className="cart-product-price__right">
                                    <p>{calculateTotal()} $</p>
                                    <span>{calculateTotal()} $</span>
                                </div>
                            </div>
                            <button className="cart-product-btn"><Link to={'/order'}>Check Out</Link></button>
                        </div>
                    </div>
                </div>
            </section>

            <Service />
        </>
    )
}

export default Cart