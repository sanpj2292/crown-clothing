import * as actionTypes from '../action-types';

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.EMAIL_SIGN_IN_SUCCESS:
        case actionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case actionTypes.EMAIL_SIGN_IN_FAILURE:
        case actionTypes.GOOGLE_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;