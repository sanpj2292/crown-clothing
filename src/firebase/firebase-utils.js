import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_MESSAGE_SENDER_ID, REACT_APP_FIREBASE_MESSAGE_RECEIVER_ID, REACT_APP_FIREBASE_MEASUREMENT_ID } = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: "crown-ecom-db.firebaseapp.com",
    databaseURL: "https://crown-ecom-db.firebaseio.com",
    projectId: "crown-ecom-db",
    storageBucket: "crown-ecom-db.appspot.com",
    messagingSenderId: REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: `1:${REACT_APP_FIREBASE_MESSAGE_SENDER_ID}:web:${REACT_APP_FIREBASE_MESSAGE_RECEIVER_ID}`,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        // Creation of Data
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user data');
        }
    }
    return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const addCollectionDocs = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};
export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            title,
            items,
            id: doc.id
        };
    });
    const reducedCollection = transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
    return reducedCollection;
};

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;