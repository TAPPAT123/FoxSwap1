const translations = {
    ru: {
      'main-title': 'Тапай и зарабатывай!',
      'home-link': 'Главная',
      'tasks-link': 'Задания',
      'friends-link': 'Друзья',
      'aur-link': 'Тут нихуя пока нет',
      // ... другие переводы ...
    },
    en: {
      'main-title': 'Tap to Earn!',
      'home-link': 'Home',
      'tasks-link': 'Tasks',
      'friends-link': 'Friends',
      // ... другие переводы ...
      'aur-link': 'Тут еще долго нихуя не будет,можешь не тыкать',
    }
  };
  
document.addEventListener('DOMContentLoaded', (event) => { 
const languageFlags = document.querySelectorAll('.language-flag');
const translatableElements = document.querySelectorAll('[data-translate]');


 function setLanguage(lang) {
    // Устанавливаем активный флаг
    languageFlags.forEach(flag => {
      flag.classList.toggle('active', flag.dataset.lang === lang);
    });

    // Переводим элементы
    translatableElements.forEach(element => {
      const key = element.dataset.translate;
      element.textContent = translations[lang][key];
    });
  }
  languageFlags.forEach(flag => {
    flag.addEventListener('click', () => {
      setLanguage(flag.dataset.lang);
    });
  });

   setLanguage('ru'); 
});



