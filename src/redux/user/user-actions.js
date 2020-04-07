import * as actionTypes from '../action-types';

export const googleSignInStart = () => ({
    type: actionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: actionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: actionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: actionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: actionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: actionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
    type: actionTypes.SIGN_OUT_FAILURE,
    payload: error
});

// Sign Up Actions
export const signUpStart = (userData) => ({
    type: actionTypes.SIGN_UP_START,
    payload: userData
});

export const signUpSuccess = (emailAndPassword) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: emailAndPassword
});

export const signUpFailure = (error) => ({
    type: actionTypes.SIGN_UP_FAILURE,
    payload: error
});