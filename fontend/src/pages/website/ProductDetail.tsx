import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocalStorage } from '../../common/hooks/useStorage';
import { useProductQuery } from '../../common/hooks/useProductQuery';


const ProductDetail = () => {
    const queryClient = useQueryClient();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, isLoading, isError } = useProductQuery()
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
            })
        },
    });
    const { id } = useParams<{ _id: string }>();
    const [product, setProduct] = useState<any>({}); // Sử dụng any cho biến product

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const { data } = await axios.get(`http://localhost:8080/api/products/${id}`); // Sửa URL endpoint nếu cần thiết
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }



    return (
        <>
            <div>
                <section className="address">
                    <div className="container">
                        <div className="address-locatinon">
                            <div className="address-page-dh">
                                <p>Home <strong>&gt;</strong>Shop <strong>&gt;</strong></p>
                            </div>
                            <div className="address-page-dc">
                                <p>{product?.name}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="detail">
                    <div className="container">
                        <div className="detail-prouct">
                            <div className="detail-image">
                                {/* <div className="detail-image-left">
                                    <div className="detail-image-left__sp"> <img src="./img/spct1.png" alt /></div>
                                    <div className="detail-image-left__sp"> <img src="./img/spct2.png" alt /></div>
                                    <div className="detail-image-left__sp"> <img src="./img/apct3.png" alt /></div>
                                    <div className="detail-image-left__sp"> <img src="./img/spct4.png" alt /></div>
                                </div> */}
                                <div className="detail-image-right" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={product.image} alt="" />
                                </div>
                            </div>
                            {/* chi dôi */}
                            <div className="detail-twoblock">
                                <div className="detail-text">
                                    <h3>{product.name}</h3>
                                    <p className="detail-text__vd">{product.price} $</p>
                                    <div className="detail-text-customer">
                                        <div className="detail-text-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                                                <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                                            </svg>
                                        </div>
                                        <div className="detail-text-review">
                                            <p>5 Customer Review</p>
                                        </div>
                                    </div>
                                    <p>{product.description}
                                    </p>
                                    <div className="detail-text-size">
                                        <p className="detail-text__size">size</p>
                                        <div className="detail-zize-list">
                                            <div className="detail-size__box">
                                                <p>L</p>
                                            </div>
                                            <div className="detail-size__box">
                                                <p>XL</p>
                                            </div>
                                            <div className="detail-size__box">
                                                <p>XS</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail-text-color">
                                        <p className="detail-text__size">color</p>
                                        <div className="detail-color-list">
                                            <div className="detail-color__box1">
                                            </div>
                                            <div className="detail-color__box2">
                                            </div>
                                            <div className="detail-color__box3">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail-button-add">
                                        <div className="detail-button-sl">
                                            <p>-</p>
                                            <p>1</p>
                                            <p>+</p>
                                        </div>
                                        <div className="detail-button-lick">
                                            <p onClick={() => mutate({ productId: product._id, quantity: 1 })}><Link to={`/cart`}>Add To Cart</Link></p>
                                        </div>
                                        <div className="detail-button-th">
                                            <p>+</p>
                                            <p>Compare</p>
                                        </div>
                                    </div>
                                </div>
                                {/* chân */}
                                <div className="detail-parameter-pro">
                                    <div className="detail-parameter-left">
                                        <p>SKU</p>
                                        <p>Category</p>
                                        <p>Tags</p>
                                        <p>Share</p>
                                    </div>
                                    <div className="detail-parameter-right">
                                        <p>: SS001</p>
                                        <p>: Sofas</p>
                                        <p>: Sofa, Chair, Home, Shop</p>
                                        <p>:  <img src="./img/face.svg" alt="" />
                                            <img src="./img/im.svg" alt="" />
                                            <img src="./img/twiter.svg" alt="" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*----------------------- kêt thúc thằng sp chi tiết -----------------------*/}
                <section className="description">
                    <div className="container">
                        <div className="description-product">
                            <div className="description-product-top">
                                <div className="description-product-items">
                                    <div className="description-product-nav">
                                        <p>Description</p>
                                        <p>Additional Information</p>
                                        <p>Reviews [5]</p>
                                    </div>
                                    <div className="description-product-content">
                                        <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo
                                            speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes
                                            the
                                            show on the road.</p>
                                        <br />
                                        <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled
                                            engineering.
                                            Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact,
                                            stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended
                                            highs for a sound that is both articulate and pronounced. The analogue knobs allow you
                                            to
                                            fine tune the controls to your personal preferences while the guitar-influenced leather
                                            strap enables easy and stylish travel.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="description-product-bottom">
                                <div className="description-product_imgcheck">
                                    <img src="../img/Group 106.png" alt="lỗi" />
                                </div>
                                <div className="description-product_imgcheck">
                                    <img src="../img/Group 107.png" alt="loi" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default ProductDetail