import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/4.4 crown.svg';
import { auth } from '../../firebase/firebase-utils';
import { connect } from 'react-redux';

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import './header.scss';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/shop'>CONTACT</Link>
                {
                    currentUser ?
                        (<div className='option' onClick={() => auth.signOut()}>SIGNOUT</div>) :
                        (<Link className='option' to='/signin'>SIGNIN</Link>)
                }
                <CartIcon />
            </div>
            {!hidden ? <CartDropdown /> : null}
        </div>
    )
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
    return ({
        currentUser: currentUser,
        hidden: hidden
    });
};

export default connect(mapStateToProps)(Header);