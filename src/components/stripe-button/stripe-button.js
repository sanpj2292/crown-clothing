import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; // To Convert the price from dollars to cents
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    const onToken = token => {
        console.log(token);
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

export default StripeCheckoutButton;