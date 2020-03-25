import { TOGGLE_CART, ADD_ITEM, CLEAR_ITEM_FROM_CART } from "../action-types";

export const toggleCart = () => ({
    type: TOGGLE_CART
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const clearItemFromCart = (item) => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item
});