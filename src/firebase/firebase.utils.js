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

export const createUserProfileDocument = async (userAuth, additionalDAta) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalDAta
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;