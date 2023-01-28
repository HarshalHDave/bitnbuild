// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Uohu9qOnIUEDN4V0jTWd5pAZfT3-yYk",
  authDomain: "bitnbuild-1b5bb.firebaseapp.com",
  projectId: "bitnbuild-1b5bb",
  storageBucket: "bitnbuild-1b5bb.appspot.com",
  messagingSenderId: "708220322143",
  appId: "1:708220322143:web:1c4a16ee298c4e8521f6ea",
  measurementId: "G-Q0GT3TY9CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

