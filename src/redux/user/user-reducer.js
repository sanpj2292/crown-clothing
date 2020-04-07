import * as actionTypes from '../action-types';

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case actionTypes.SIGN_UP_FAILURE:
        case actionTypes.SIGN_OUT_FAILURE:
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                error: null,
                currentUser: null
            };
        default:
            return state;
    }
};

export default userReducer;