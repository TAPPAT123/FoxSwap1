const body = document.querySelector('body');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme'); 
});
// Получаем все элементы, на которые нужно добавить вибрацию
const clickableElements = document.querySelectorAll('.image-container, #theme-toggle'); // Добавь нужные селекторы

clickableElements.forEach(element => {
  element.addEventListener('click', () => {
    // Проверяем, поддерживает ли устройство вибрацию
    if ("vibrate" in navigator) {
      // Вибрируем 50 миллисекунд
      navigator.vibrate(50);
    }
  });
});
