import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD1Af4w4uv7NmwvvHbqK4ssYvHUrtWyJeY",
  authDomain: "contact-app-72267.firebaseapp.com",
  projectId: "contact-app-72267",
  databaseURL: "https://contact-app-72267-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "contact-app-72267.appspot.com",
  messagingSenderId: "799107909070",
  appId: "1:799107909070:web:91eaf99493966d1a9e579f",
  measurementId: "G-ZNFHTMM9S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;