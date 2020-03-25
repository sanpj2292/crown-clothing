import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/11.2 shopping-bag.svg';
import './cart-icon.scss';
import { connect } from "react-redux";
import { toggleCart } from '../../redux/cart/cart-actions';

const CartIcon = ({ toggleCartHidden }) => {
    return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    const toggleCartAction = toggleCart();
    return {
        toggleCartHidden: () => dispatch(toggleCartAction)
    };
};

export default connect(null, mapDispatchToProps)(CartIcon);