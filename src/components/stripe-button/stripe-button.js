import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { clearCart } from "../../redux/cart/cart-actions";

const StripeCheckoutButton = ({ price, history, clearCart }) => {
    const priceForStripe = price * 100; // To Convert the price from dollars to cents
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    const onToken = token => {
        alert('Payment has been successful');
        // This function is from the props
        clearCart();
        // Redirect to the home-page
        history.push('/');
    };

    return (
        <StripeCheckout
            label='Pay now'
            name='Crown Clothing Ltd'
            shippingAddress
            billingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}// OnSuccess Callback
            stripeKey={publishableKey}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearCart())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(StripeCheckoutButton));