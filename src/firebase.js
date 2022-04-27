import firebase from 'firebase/app'
import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVYQWy9EG_W4EbW9CoAIpf9kaer9dOIHc",
  authDomain: "otp-app-demo-55936.firebaseapp.com",
  projectId: "otp-app-demo-55936",
  storageBucket: "otp-app-demo-55936.appspot.com",
  messagingSenderId: "198870049854",
  appId: "1:198870049854:web:386d2cdb9c5ff8b6af9d6f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase
