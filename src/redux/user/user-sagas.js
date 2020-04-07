import { takeLatest, call, put, all } from "redux-saga/effects";

import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START } from '../action-types';

import {
    auth,
    googleProvider,
    createUserProfileDocument
} from "../../firebase/firebase-utils";

import { googleSignInFailure, googleSignInSuccess, emailSignInFailure, emailSignInSuccess } from "./user-actions";

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            googleSignInSuccess(
                { id: userSnapshot.id, ...userSnapshot.data() }
            )
        );
    } catch (error) {
        yield put(googleSignInFailure(error));
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess(
                { id: userSnapshot.id, ...userSnapshot.data() }
            )
        );
    } catch (error) {
        yield put(emailSignInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ]);
}