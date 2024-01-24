// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYmyGxIgVkVFFJXWP_7q54l9VUli5ciCY",
  authDomain: "e-shop-chaoo-charles.firebaseapp.com",
  projectId: "e-shop-chaoo-charles",
  storageBucket: "e-shop-chaoo-charles.appspot.com",
  messagingSenderId: "833940365046",
  appId: "1:833940365046:web:d5de1e735e8ddb1f2916d7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;