import React from 'react';
import { Link } from 'react-router-dom';
import Service from './Service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IProduct } from '../../interfaces/Product';
import { useProductQuery } from '../../common/hooks/useProductQuery';
import { useLocalStorage } from '../../common/hooks/useStorage';


interface Props {
    products: IProduct[];
}

const Shops: React.FC<Props> = () => {
    const queryClient = useQueryClient();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, isLoading, isError } = useProductQuery();
    const { mutate } = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
            const { data } = await axios.post(`http://localhost:8080/api/cart/add-to-cart`, {
                userId,
                productId,
                quantity,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });

        },
    });

    // const { data } = useQuery({
    //     queryKey: ['PRODUCTS'],
    //     queryFn: async () => {
    //         const { data } = await axios.get(`http://localhost:8080/api/products`);
    //         return data.products;
    //     }
    // });

    return (
        <>
            <section className="banner">
                <div className="banner-img__shop" style={{ width: '1460px', height: '316px', overflow: 'hidden' }}>
                    <img src="./img/banner-shopp.png" className="banner__shop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </section>
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Shop </h2>
                    </div>
                    <div className="section-body">
                        <div className="product-list">
                            {data?.map((product: IProduct, index: number) => (
                                <div className="product-item" key={index}>
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} className="product__thumbnail" />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product__name">
                                            <Link to={`/productdetail/${product._id}`} className="product__link">{product.name}</Link>
                                        </h3>
                                        <a href="" className="product__category">Stylish cafe chair</a>
                                        <div className="product-price">
                                            <span className="product-price__new">{product.price} $</span>
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn product-action__quickview"><Link to={`/products/${product._id}`}>Quick View </Link></button>
                                        <button className="btn product-action__addtocart" onClick={() => mutate({ productId: product._id, quantity: 1 })}><Link to={`/cart`}>Add To Cart</Link></button>
                                        <div className="product-actions-more">
                                            <span className="product-action__share">Share</span>
                                            <span className="product-action__compare">Compare</span>
                                            <span className="product-action__like">Like</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <button id="page1">1</button>
                    <button id="page2">2</button>
                    <button id="page3">3</button>
                    <button id="next">Next</button>
                </div>
            </section >
            <Service />
        </>
    );
};

export default Shops;
