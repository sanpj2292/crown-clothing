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

export const removeItemFromCart = (cartItems, toBeRemovedItem) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === toBeRemovedItem.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== toBeRemovedItem.id)
    }
    return cartItems.map(cartItem => {
        const { id, quantity } = cartItem;
        const newQuantity = id === toBeRemovedItem.id ? quantity - 1 : quantity;
        return { ...cartItem, quantity: newQuantity }
    });
};