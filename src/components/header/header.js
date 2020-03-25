import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon";
import { ReactComponent as Logo } from '../../assets/4.4 crown.svg';
import { auth } from '../../firebase/firebase-utils';
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);