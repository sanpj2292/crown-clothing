import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTa0ZUkv6ZFTUyafyTcfft4-6kazfg6DY",
    authDomain: "crown-db-11020.firebaseapp.com",
    databaseURL: "https://crown-db-11020.firebaseio.com",
    projectId: "crown-db-11020",
    storageBucket: "crown-db-11020.appspot.com",
    messagingSenderId: "850478045197",
    appId: "1:850478045197:web:520c47d672372fafed5d44"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;