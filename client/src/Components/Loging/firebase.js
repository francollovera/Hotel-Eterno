// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfzwjcsjGrhgOIgkxcosxhS5-EFdL_zIg",
  authDomain: "fir-hotel-b946d.firebaseapp.com",
  projectId: "fir-hotel-b946d",
  storageBucket: "fir-hotel-b946d.appspot.com",
  messagingSenderId: "403026096841",
  appId: "1:403026096841:web:aaf5f57c65a4a5d823d318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
