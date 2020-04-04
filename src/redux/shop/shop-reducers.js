import shopData from "./shop-data";
import { UPDATE_COLLECTIONS } from "../action-types";

const INITIAL_STATE = {
    collections: shopData
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
};

export default shopReducer;