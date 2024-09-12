import { db } from './firebase_config.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded: Событие сработало.");
  getTelegramUserId()
    .then(userId => {
      console.log("getTelegramUserId: Telegram ID получен:", userId);
      if (userId) {
        addUserToFirestore(userId);
      } else {
        console.error('getTelegramUserId: Не удалось получить Telegram ID.');
        // Дополнительная обработка ошибки, если нужно
        // Например, показать пользователю сообщение об ошибке
        alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
      }
    })
    .catch(error => {
      console.error('getTelegramUserId: Ошибка при получении Telegram ID:', error);
      // Обработка ошибки, если нужно
      // Например, показать пользователю сообщение об ошибке
      alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
    });
});

async function getTelegramUserId() {
  return new Promise((resolve, reject) => { 
    console.log("getTelegramUserId: Начинаем получение Telegram ID...");
    if (window.Telegram.WebApp) {
      console.log("getTelegramUserId: Telegram API доступен.");
      resolve(window.Telegram.WebApp.initData.user?.id);
    } else {
      console.log("getTelegramUserId: Telegram API не готов, ожидаем...");
      const intervalId = setInterval(() => {
        if (window.Telegram.WebApp) {
          console.log("getTelegramUserId: Telegram API готов!");
          clearInterval(intervalId);
          resolve(window.Telegram.WebApp.initData.user?.id);
        }
      }, 100);
    }
  });
}

async function addUserToFirestore(userId) {
  try {
    console.log("addUserToFirestore: Начинаем добавление пользователя...", userId);
    const userRef = db.collection('users').doc(userId);

    const userDoc = await userRef.get();
    console.log("addUserToFirestore: Проверка существования пользователя...", userDoc.exists);

    if (!userDoc.exists) {
      await userRef.set({
        balance: 0,
        // ... другие начальные данные ...
      });
      console.log('addUserToFirestore: Пользователь успешно добавлен в Firestore!', userId);
    } else {
      console.log('addUserToFirestore: Пользователь уже существует в Firestore.', userId);
      // ... логика, если пользователь уже существует ...
    }
  } catch (error) {
    console.error('addUserToFirestore: Ошибка при добавлении пользователя в Firestore:', error);
    // Обработка ошибки
    // Например, показать пользователю сообщение об ошибке
    alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
  }
}

