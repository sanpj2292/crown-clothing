import * as actionTypes from '../action-types';

export const setCurrentUser = user => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
};