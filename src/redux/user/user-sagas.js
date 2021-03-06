import { takeLatest, call, put, all } from "redux-saga/effects";

import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, CHECK_USER_SESSION, SIGN_OUT_START, SIGN_UP_START, SIGN_UP_SUCCESS } from '../action-types';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from "../../firebase/firebase-utils";

import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    emailSignInStart,
    signUpSuccess
} from "./user-actions";

function* signInGenerator(action) {
    try {
        let userAuth = null;
        if (action.type === GOOGLE_SIGN_IN_START) {
            const { user } = yield auth.signInWithPopup(googleProvider);
            userAuth = user;
        } else {
            const { payload: { email, password } } = action;
            const { user } = yield auth.signInWithEmailAndPassword(email, password);
            userAuth = user;
        }
        yield getUserSnapshot(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInGenerator);
}


export function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, signInGenerator);
}

function* getUserSnapshot(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getUserSnapshot(userAuth)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutSuccess()
        )
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(SIGN_OUT_START, signOutUser)
}


// Sign Up generators

function* signUpUser({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield call(createUserProfileDocument, user, { displayName });
        yield put(
            signUpSuccess({ email, password })
        );
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START, signUpUser);
}

// Post SignUp we are trying to sign-in
function* signInPostSignUp({ payload }) {
    yield put(emailSignInStart(payload));
}

// Upon Successful Sign Up
export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS, signInPostSignUp);
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}