
const firebaseConfig = {
    apiKey: "AIzaSyBQh47_6mN23DZ37YzQAplAmvZ9I3tnIdM",
    authDomain: "foxswap1-c32af.firebaseapp.com",
    projectId: "foxswap1-c32af",
    storageBucket: "foxswap1-c32af.appspot.com",
    messagingSenderId: "402106129665",
    appId: "1:402106129665:web:b9a63193ca6e2001078f00"
    };
    
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore(app);