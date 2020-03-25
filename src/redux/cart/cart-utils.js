export const addItemToCart = (cartItems, newCartItem) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === newCartItem.id);
    if (existingCartItem) {
        return cartItems.map(cartItem => {
            if (cartItem.id === newCartItem.id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
            } else {
                return cartItem;
            }
        });
    }
    return [...cartItems, { ...newCartItem, quantity: 1 }];
};