import * as actionTypes from '../action-types';

export const setCurrentUser = user => {
    console.log('User Actions...');
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
};