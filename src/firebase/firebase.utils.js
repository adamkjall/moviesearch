import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        watchlist: [],
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addMovieToWatchlist = async (userId, movieId) => {
  firestore
    .collection("users")
    .doc(`${userId}`)
    .update({
      watchlist: firebase.firestore.FieldValue.arrayUnion(movieId)
    })
    .then(() => console.log(`MovieId: ${movieId} added to watchlist.`))
    .catch(error => console.log("Error adding movie to watchlist: ", error));
};

export const getWatchlist = async userId => {
  const userDoc = await firestore
    .collection("users")
    .doc(`${userId}`)
    .get();
  if (userDoc.exists) {
    return userDoc.data().watchlist;
  } else {
    console.log("Document does not exist");
  }
};

export default firebase;
