import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDlDO5JBi6kztbkiwY56OLcz-gAO3o1J_w",
    authDomain: "ecom-3600f.firebaseapp.com",
    databaseURL: "https://ecom-3600f.firebaseio.com",
    projectId: "ecom-3600f",
    storageBucket: "ecom-3600f.appspot.com",
    messagingSenderId: "349095666373",
    appId: "1:349095666373:web:143ed340d1d907352486ac",
    measurementId: "G-Z94ZF7DX3J"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;