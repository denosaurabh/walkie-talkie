import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB51AHS2R7NvJrnqzkEbvaJ7hO01JvnqhA",
    authDomain: "walkie-talkie-d2910.firebaseapp.com",
    databaseURL: "https://walkie-talkie-d2910.firebaseio.com",
    projectId: "walkie-talkie-d2910",
    storageBucket: "walkie-talkie-d2910.appspot.com",
    messagingSenderId: "1079664695271",
    appId: "1:1079664695271:web:c357e9230336f26c52cf42",
    measurementId: "G-CMGX3GM582"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();