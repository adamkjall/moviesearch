import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA_9VwjUoECAutOaZRZ8IVYBvpTjgcKVJo",
  authDomain: "movie-search-be331.firebaseapp.com",
  databaseURL: "https://movie-search-be331.firebaseio.com",
  projectId: "movie-search-be331",
  storageBucket: "movie-search-be331.appspot.com",
  messagingSenderId: "752000773184",
  appId: "1:752000773184:web:55210571f35a4a90f4c3a5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
  
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
