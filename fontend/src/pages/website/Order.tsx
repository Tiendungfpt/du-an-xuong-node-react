import useCart from '../../common/hooks/useCart'
import { useLocalStorage } from '../../common/hooks/useStorage';
import Service from './Service';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Order = () => {

    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    console.log(userId)
    const { data, calculateTotal } = useCart();

    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await axios.post(
                "http://localhost:8080/api/order",
                order,
            );
            return data;
        },
        onSuccess: () => {
            clearCart();
            navigate("/")
            alert("Đặt hàng thành công");
        },
    });

    const clearCartMutation = useMutation({
        mutationFn: async (userId) => {
            const { data } = await axios.post(`http://localhost:8080/api/cart/remove/${userId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });
        },
    });

    const clearCart = async () => {
        try {
            await clearCartMutation.mutateAsync(userId);
        } catch (error) {
            console.error("An error occurred while clearing cart:", error);
            alert("Đã xảy ra lỗi khi xóa giỏ hàng");
        }
    };


    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };

    return (
        <>
            <section className="banner">
                <div className="banner-img">
                    <img src="./img/banner-check.png" className="banner__img" />
                </div>

            </section>

            <section className="pay">
                <form onSubmit={handleSubmit(onSubmit)} className="pay-all">
                    <div className="pay-all-left">
                        <h2 className="pay-all-title">Thông tin thanh toán</h2>
                        <div className="pay-all-bill">
                            <div className="pay-bill-company">
                                <p>Name</p>
                                <input className="pay-bill-input" id='name' type="text" placeholder='name' {...register("name", { required: true })} />
                            </div>

                            <div className="pay-bill-phone">
                                <p>Phone</p>
                                <input className="pay-bill-input" id='phone' type="text" placeholder='phone' {...register("phone")} />
                            </div>
                            <div className="pay-bill-email">
                                <p>Email</p>
                                <input className="pay-bill-input" id='email' type="email" placeholder='email' {...register("email", { required: true })} />
                            </div>
                            <div className="pay-bill-city">
                                <p>Town / City</p>
                                <input className="pay-bill-input" type="text" id='city' placeholder=" Town / City" {...register("city")} />
                            </div>
                            <div className="pay-bill-none">
                                <input className="pay-bill-inputnone" type="text" id='address' placeholder="Shipping address" {...register("address")} />
                            </div>

                        </div>
                    </div>
                    <div className="pay-all-right">
                        <div className="pay-all-list">
                            {data?.products.map((product: any, index: number) => {
                                return (
                                    <div className='product-order' key={index}>
                                        <div className="pay-all__name">
                                            <h3>Sản phẩm {index + 1}</h3>
                                            <p><span>{product.name}</span> x {product.quantity}</p>
                                            <p>Subtotal: {product.price} $</p>
                                            <p>Total: {product.price * product.quantity} $</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="pay-all__price">
                            <h3>Tổng thanh toán</h3>
                            <strong>Sản phẩm: </strong>
                            {data?.products ? data?.products.length : 0} {/* Hiển thị số lượng sản phẩm, nếu không có thì hiển thị 0 */}
                            <h2 >Tổng tiền: {calculateTotal()} $</h2 >
                        </div>
                        <hr />

                        <div className="pay-all-servicepay">
                            <span>
                                Direct Bank Transfer
                            </span>
                            <p className="pay-servicepay-text">Make your payment directly into our bank account. Please use  your
                                Order ID as the payment
                                reference. Your order will not be  shipped until the funds have cleared in our account</p>
                            <div className="pay-all-billsp">
                                <input name="gender" type="radio" defaultValue="Bank" />Direct Bank Transfer
                                <br /><br />
                                <input name="gender" type="radio" defaultValue="Cash" />Cash On Delivery
                            </div>
                            <p>Your personal data will be used to support your experience  throughout this website, to manage
                                access to your account, and  for other purposes described in our <strong>privacy
                                    policy</strong>.
                            </p>
                            <button type='submit' className="pay-all-btn">Place order</button>
                        </div>
                    </div>
                </form>
            </section>
            <Service />
        </>
    )
}

export default Order
