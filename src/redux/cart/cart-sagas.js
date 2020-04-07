import { all, call, put, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../action-types";
import { clearCart } from "./cart-actions";


function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(actionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ]);
}