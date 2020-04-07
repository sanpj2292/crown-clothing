import { takeLatest, call, put, all } from "redux-saga/effects";

import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, CHECK_USER_SESSION } from '../action-types';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from "../../firebase/firebase-utils";

import { signInFailure, signInSuccess } from "./user-actions";

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
        console.log('UserAuth Object: ', userAuth);
        if (!userAuth) return;
        yield getUserSnapshot(userAuth)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ]);
}