import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
    apiKey: "<firebaseapikey>",
    authDomain: "chatapp-8e30a.firebaseapp.com",
    projectId: "chatapp-8e30a",
    storageBucket: "chatapp-8e30a.appspot.com",
    messagingSenderId: "226598871952",
    appId: "1:226598871952:web:57b68fdd9db55b6ea8c915",
    measurementId: "G-S32D5V942D"
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
