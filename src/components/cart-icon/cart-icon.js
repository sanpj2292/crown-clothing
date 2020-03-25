import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/11.2 shopping-bag.svg';
import './cart-icon.scss';
import { connect } from "react-redux";
import { toggleCart } from '../../redux/cart/cart-actions';

import { selectCartItemsCount } from "../../redux/cart/cart-selectors";

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

const mapStateToProps = state => {
    return {
        itemCount: selectCartItemsCount(state)
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);