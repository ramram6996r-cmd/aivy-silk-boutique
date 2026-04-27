import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBpq5FPBALS8cgSFKWrOi9rLIC--1DTN7w',
  authDomain: 'aivy-silk-store.firebaseapp.com',
  projectId: 'aivy-silk-store',
  storageBucket: 'aivy-silk-store.firebasestorage.app',
  messagingSenderId: '907159056158',
  appId: '1:907159056158:web:8c86b8a9e3472f7846630f',
  measurementId: 'G-Y380KS7DM4',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
