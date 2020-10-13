import * as firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPSUn79KBiURiPxsCKeuKLDrV_BFfhUHA",
    authDomain: "ecommerce-auth-egg.firebaseapp.com",
    databaseURL: "https://ecommerce-auth-egg.firebaseio.com",
    projectId: "ecommerce-auth-egg",
    storageBucket: "ecommerce-auth-egg.appspot.com",
    messagingSenderId: "19425978286",
    appId: "1:19425978286:web:9ef8078a40c2087e864a3f"
};
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Export

    export const auth = firebase.auth()
    export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    export const facebookProvider = new firebase.auth.FacebookAuthProvider();