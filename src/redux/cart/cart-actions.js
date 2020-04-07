import {
    TOGGLE_CART, ADD_ITEM, CLEAR_ITEM_FROM_CART,
    REMOVE_ITEM, CLEAR_CART
} from "../action-types";

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

export const removeItem = (item) => ({
    type: REMOVE_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: CLEAR_CART,
});