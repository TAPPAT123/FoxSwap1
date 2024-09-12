
 async function getTelegramUserId() {
    return new Promise((resolve, reject) => {
      if (window.Telegram && window.Telegram.WebApp) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user?.id;
        if (userId) {
          resolve(userId.toString()); // Возвращаем ID как строку
        } else {
          reject(new Error("Telegram user ID not found."));
        }
      } else {
        reject(new Error("Telegram API not available."));
      }
    });
  }
  async function checkAndCreateUser(userId) {
    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set({
          balance: 0,
          progress: 0,
          referralCode: null, // Сгенерируем позже
          referrals: [] // Массив для хранения ID рефералов
        });
        console.log('Новый пользователь создан в Firebase:', userId);
      } else {
        console.log('Пользователь уже существует в Firebase:', userId);
      }
    } catch (error) {
      console.error("Ошибка при проверке/создании пользователя:", error);
      // Дополнительная обработка ошибки, например, показ сообщения пользователю
    }
  }   window.addEventListener('load', async () => {
    try {
      const telegramUserId = await getTelegramUserId(); 
      console.log("Telegram User ID:", telegramUserId);

      if (telegramUserId) {
        await checkAndCreateUser(telegramUserId);
        // ... дальнейшие действия, например, обновление интерфейса ...
      } else {
        // Обработка ошибки, если ID не получен
        showError("Create a telegram id"); 
      }
    } catch (error) {
      console.error("Ошибка при инициализации:", error);
      // ... обработка ошибки ...
    }
  });

  function showError(errorMessage) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = errorMessage;
    errorDiv.style.cssText = 
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 0, 0, 0.8); color: white; display: flex; justify-content: center; align-items: center; font-size: 24px; z-index: 1000;";
    document.body.appendChild(errorDiv);
  }
  
  