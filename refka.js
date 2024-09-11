
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore';
import Referral from './referral';

// Инициализация Firebase (только если это не сделано в другом месте)
const firebaseConfig = {
  // ... (Твоя конфигурация Firebase)
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 

const root = ReactDOM.createRoot(document.getElementById('referral-section'));
root.render(<Referral />);
