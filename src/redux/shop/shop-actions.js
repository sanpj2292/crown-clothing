import { UPDATE_COLLECTIONS } from "../action-types";

export const updateCollections = (collectionsMap) => {
    return {
        type: UPDATE_COLLECTIONS,
        payload: collectionsMap
    }
}