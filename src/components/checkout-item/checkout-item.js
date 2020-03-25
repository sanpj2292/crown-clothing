import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.scss';
import { clearItemFromCart } from "../../redux/cart/cart-actions";

const CheckoutItem = ({ cartItem, clearItem }) => {
    const { imageUrl, name, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <span className='quantity'>{quantity}</span>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearItem: (item) => dispatch(clearItemFromCart(item))
    };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);