import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import { selectCartItems } from "../../redux/cart/cart-selectors";

const Cart = ({ cartItems }) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps)(Cart);