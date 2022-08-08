import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiE0Sr9nncN2MrSF6eyr-vw16hNr4GJeM",
  authDomain: "mydata-88d15.firebaseapp.com",
  projectId: "mydata-88d15",
  storageBucket: "mydata-88d15.appspot.com",
  messagingSenderId: "869587095380",
  appId: "1:869587095380:web:a6931be60c7ab3dd6ec2c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app