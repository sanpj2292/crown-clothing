import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './cart-icon.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/11.2 shopping-bag.svg';
import { selectCartItemsCount } from "../../redux/cart/cart-selectors";
import { toggleCart } from '../../redux/cart/cart-actions';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    const toggleCartAction = toggleCart();
    return {
        toggleCartHidden: () => dispatch(toggleCartAction)
    };
};

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);