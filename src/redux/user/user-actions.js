import * as actionTypes from '../action-types';

export const setCurrentUser = user => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
};

export const googleSignInStart = () => ({
    type: actionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (user) => ({
    type: actionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailure = error => ({
    type: actionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: actionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const emailSignInSuccess = (user) => ({
    type: actionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFailure = error => ({
    type: actionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
});