import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDehSS5rpa5cHoU6s10__wqlq16lMAqGl4",
  authDomain: "react-slack-clone-f5003.firebaseapp.com",
  databaseURL: "https://react-slack-clone-f5003.firebaseio.com",
  projectId: "react-slack-clone-f5003",
  storageBucket: "react-slack-clone-f5003.appspot.com",
  messagingSenderId: "776248419351",
  appId: "1:776248419351:web:7ea569b77c3eb697006852",
  measurementId: "G-Z5CSM1YM0B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
