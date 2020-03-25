import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import { selectCartItems } from "../../redux/cart/cart-selectors";

import { withRouter } from "react-router-dom";

const Cart = ({ cartItems, history }) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length > 0 ?
                        cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />) :
                        <span className='empty-message'>Your cart is Empty</span>
                }
            </div>
            <CustomButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(Cart));