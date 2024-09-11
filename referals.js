import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBQh47_6mN23DZ37YzQAplAmvZ9I3tnIdM",
  authDomain: "foxswap1-c32af.firebaseapp.com",
  projectId: "foxswap1-c32af",
  storageBucket: "foxswap1-c32af.appspot.com",
  messagingSenderId: "402106129665",
  appId: "1:402106129665:web:ca436fd0cde65e65078f00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Referral() {
  const { user } = useOutletContext();
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (user && user.id) {
        const q = query(collection(db, 'users'), where('referredBy', '==', user.id));
        const querySnapshot = await getDocs(q);
        setReferrals(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchReferrals();
  }, [user]); 

  return (
    <div className="referral">
      <h2 className="text-xl font-bold mb-4">Приглашай друзей и получай монеты!</h2>
      <p className="mb-4">Поделись своей уникальной ссылкой:</p>
      <p className="referral-link font-bold text-blue-500 underline" id="referral-link">
        https://your-app.com/ref/{user ? user.id : ''} 
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2">Ваши рефералы:</h3>
      {referrals.length > 0 ? (
        <ul>
          {referrals.map(referral => (
            <li key={referral.id}>{referral.id}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">У вас пока нет рефералов.</p>
      )}
    </div>
  );
}

export default Referral;
