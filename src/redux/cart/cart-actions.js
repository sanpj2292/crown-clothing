import { TOGGLE_CART, ADD_ITEM } from "../action-types";

export const toggleCart = () => ({
    type: TOGGLE_CART
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});