import React from "react";
import './checkout.scss';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart-selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";

const CheckoutPage = ({ cartItems, total }) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => {
                    return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
                })
            }
            <div className='total'>
                <span>Total: ${total}</span>
            </div>
            {total > 0 ?
                (<div className='stripe-div'>
                    <div className='test-warning'>
                        ** Please use the following test credit card for payments **
                        <br />
                        4242 4242 4242 4242  - Exp: 04/20 - CVV: 123
                    </div>
                    <StripeCheckoutButton price={total} />
                </div>) : null}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);