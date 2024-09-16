// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3wM76X_hQqK1SCeQzYqDYe5dKj_Xr9_Q",
  authDomain: "cg-frontend-storage.firebaseapp.com",
  projectId: "cg-frontend-storage",
  storageBucket: "cg-frontend-storage.appspot.com",
  messagingSenderId: "1056133584791",
  appId: "1:1056133584791:web:0cd67158c23214ce67d6d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, storage, getStorage, ref, uploadBytes, getDownloadURL };
