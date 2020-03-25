import { TOGGLE_CART, ADD_ITEM } from "../action-types";
import { addItemToCart } from "./cart-utils";

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
        default:
            return state;
    }
};

export default cartReducer;