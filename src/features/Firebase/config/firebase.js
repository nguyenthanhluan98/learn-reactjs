import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCYoVjjfYEnbQsWJGorhDoz_YRsKg4E5c4',
  authDomain: 'dxc-training-reactjs.firebaseapp.com',
  databaseURL: 'https://dxc-training-reactjs-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'dxc-training-reactjs',
  storageBucket: 'dxc-training-reactjs.appspot.com',
  messagingSenderId: '428935954173',
  appId: '1:428935954173:web:30fe516633097a8eae0894',
  measurementId: 'G-VDX4F3T4R1',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db.collection('users').where('uid', '==', user.uid).get();
    if (query.docs.length === 0) {
      await db.collection('users').add({
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { signInWithGoogle, auth };
