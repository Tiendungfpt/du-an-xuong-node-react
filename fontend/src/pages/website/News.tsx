import React from "react";

const News = () => {
    return (
        <section className="news">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-heading__title">New</h2>
                </div>
                <div className="section-body">
                    <div className="product-list">
                        <div className="product-item">
                            <div className="product-image">
                                <img src="./img/product2.png" alt="" className="product__thumbnail" />
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <a className="product__link">Syltherine</a>
                                </h3>
                                <a className="product__category">Stylish cafe chair</a>
                                <div className="product-price">
                                    <span className="product-price__new">$200</span>
                                    <span className="product-price__old">$300</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="btn product-action__quickview">Quick View</button>
                                <button className="btn product-action__addtocart">Add To Cart</button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="./img/product1.png" alt="" className="product__thumbnail" />
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <a className="product__link">Syltherine</a>
                                </h3>
                                <a className="product__category">Stylish cafe chair</a>
                                <div className="product-price">
                                    <span className="product-price__new">$200</span>
                                    <span className="product-price__old">$300</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="btn product-action__quickview">Quick View</button>
                                <button className="btn product-action__addtocart">Add To Cart</button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="./img/product3.png" alt="" className="product__thumbnail" />
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <a className="product__link">Syltherine</a>
                                </h3>
                                <a className="product__category">Stylish cafe chair</a>
                                <div className="product-price">
                                    <span className="product-price__new">$200</span>
                                    <span className="product-price__old">$300</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="btn product-action__quickview">Quick View</button>
                                <button className="btn product-action__addtocart">Add To Cart</button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="./img/product4.png" alt="" className="product__thumbnail" />
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <a className="product__link">Syltherine</a>
                                </h3>
                                <a className="product__category">Stylish cafe chair</a>
                                <div className="product-price">
                                    <span className="product-price__new">500.000</span>
                                    <span className="product-price__old">$300</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="btn product-action__quickview">Quick View</button>
                                <button className="btn product-action__addtocart">Add To Cart</button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default News;