import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

console.log(process.env)

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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;