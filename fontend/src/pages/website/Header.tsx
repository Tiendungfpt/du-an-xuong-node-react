import React from "react";
import { FaShoppingCart, FaSearch, FaHeart } from 'react-icons/fa';
import { FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <a className="header__logo">
                        <img src="./img/logohome.svg" alt="" />
                    </a>

                    <nav className="main-menu">
                        <ul className="main-menu__list">
                            <li className="main-menu__item">
                                <Link to={'/'} className="main-menu__link" > Home</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to="/shops" className="main-menu__link">Shop</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to={'/'} className="main-menu__link" > About</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to="/" className="main-menu__link">Contact</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="header-items">
                        <div className="header-item-user">
                            <span><Link to={'/signup'}><FaUser /></Link>
                            </span>
                        </div>
                        <div className="header-item-user">
                            <span><FaSearch /></span>
                        </div>
                        <div className="header-item-user">
                            <span><FaHeart /></span>
                        </div>
                        <div className="header-item-user">
                            <span><Link to={'/cart'}><FaShoppingCart /></Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>



    );
};

export default Header;