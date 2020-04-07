import { takeLatest, call, put } from "redux-saga/effects";

import { FETCH_COLLECTIONS_START } from "../action-types";
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase-utils";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop-actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        let snapshot = yield collectionRef.get();
        // This is correct as well const collectionsMap = yield convertCollectionSnapshotToMap(snapshot);
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}