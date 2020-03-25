import { TOGGLE_CART, ADD_ITEM, CLEAR_ITEM_FROM_CART } from "../action-types";
import { addItemToCart, removeItemFromCart } from "./cart-utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            return {
                ...state,
                hidden: !state.hidden
            };
        case ADD_ITEM:
            const added_cartItems = addItemToCart(state.cartItems, action.payload);
            return {
                ...state,
                cartItems: added_cartItems
            };
        case CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload.id)
            }
        default:
            return state;
    }
};

export default cartReducer;