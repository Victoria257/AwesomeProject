//  ініціалізувати проект
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// підключення авторизації в проект
import { getAuth } from "firebase/auth";
// підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2EZJ-QcKl55jdlq6Sp8FLXbcbUIz6RNg",
  authDomain: "awesome-c759a.firebaseapp.com",
  databaseURL:
    "https://awesome-c759a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-c759a",
  storageBucket: "awesome-c759a.appspot.com",
  messagingSenderId: "480348512806",
  appId: "1:480348512806:web:59d439301dde4237233ce7",
  measurementId: "G-M4HTNJY9SZ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
