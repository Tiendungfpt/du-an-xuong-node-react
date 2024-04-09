import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-list">
                    <div className="footer-item">
                        <img src="./assets/logo.svg" alt="" />
                        <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
                    </div>
                    <div className="footer-item">
                        <h2>Links</h2>
                        <ul className="footer-menu-list">
                            <li className="footer-menu-item">
                                <Link to={'/'} className="footer-menu-link">Home</Link>
                            </li>
                            <li className="footer-menu-item">
                                <Link to={'/Shops'} className="footer-menu-link">Shop</Link>
                            </li>
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Blog</a>
                            </li>
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h2>Help</h2>
                        <ul className="footer-menu-list">
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Payment Options</a>
                            </li>
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Returns</a>
                            </li>
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Privacy Policies</a>
                            </li>
                            <li className="footer-menu-item">
                                <a className="footer-menu-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h2>Newsletter</h2>
                        <form className="newsletter">
                            <input type="text" className="newsletter__input" placeholder="Enter Your Email Address" />
                            <button className="newsletter__btn">Subscribe</button>
                        </form>
                    </div>
                </div>
                <p className="copyright">2023 furino. All rights reverved</p>
            </div>
        </footer>

    )
}

export default Footer