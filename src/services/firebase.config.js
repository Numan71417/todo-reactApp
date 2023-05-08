
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCThJLi-4P_stJ9UqGDC88hrp0V8jqz5oc",
  authDomain: "notes-app-react-f6636.firebaseapp.com",
  projectId: "notes-app-react-f6636",
  storageBucket: "notes-app-react-f6636.appspot.com",
  messagingSenderId: "133475383150",
  appId: "1:133475383150:web:a444e66c10840ef4a7737f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);