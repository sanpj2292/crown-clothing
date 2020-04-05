import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE } from "../action-types";
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase-utils";

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return async (dispatch) => {
        try {
            const collectionRef = firestore.collection('collections');
            dispatch(fetchCollectionsStart());
            // Promise Pattern
            let snapshot = await collectionRef.get();
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        } catch (error) {
            dispatch(fetchCollectionsFailure(error.message));
        }
    };
};