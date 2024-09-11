const imageContainer = document.querySelector('.image-container');
const balanceDisplay = document.getElementById('coin-balance');
let balance = parseInt(localStorage.getItem('coinBalance') || '0', 10);
balanceDisplay.textContent = balance;

const particlesContainer = document.querySelector('.particles-container'); // Добавляем контейнер для монеток

function getRandomCoins() {
  return Math.floor(Math.random() * 5) + 1;
}

function updateBalance(earnedCoins) {
  balance += earnedCoins;
  balanceDisplay.textContent = balance;
  localStorage.setItem('coinBalance', balance);
}

// Функция для создания анимации монеток (объединяем с createCoin)
function createCoinAnimation(x, y, earnedCoins) {
  for (let i = 0; i < earnedCoins; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    particlesContainer.appendChild(coin);

    const angle = Math.random() * 360;
    const speed = Math.random() * 15 + 10;
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;

    coin.style.left = x + offsetX + 'px';
    coin.style.top = y + offsetY + 'px';

    coin.animate([
      { opacity: 1, transform: `translate(${speed * Math.cos(angle * Math.PI / 180)}px, ${speed * Math.sin(angle * Math.PI / 180)}px)` },
      { opacity: 0, transform: `translate(${speed * 2.5 * Math.cos(angle * Math.PI / 180)}px, ${speed * 2.5 * Math.sin(angle * Math.PI / 180)}px)` }
    ], {
      duration: 700,
      easing: 'ease-out',
      fill: 'forwards'
    }).onfinish = () => coin.remove();
  }

  // Создаем текстовую анимацию поверх монеток
  const coinTextAnimation = document.createElement('div');
  coinTextAnimation.classList.add('coin-animation');
  coinTextAnimation.textContent = `+${earnedCoins}`;
  coinTextAnimation.style.left = `${x}px`;
  coinTextAnimation.style.top = `${y}px`;
  imageContainer.appendChild(coinTextAnimation);
  setTimeout(() => {
    coinTextAnimation.remove();
  }, 500);
}


imageContainer.addEventListener('click', (event) => {
  const earnedCoins = getRandomCoins();
  updateBalance(earnedCoins);

  const clickX = event.clientX - imageContainer.getBoundingClientRect().left;
  const clickY = event.clientY - imageContainer.getBoundingClientRect().top;
  createCoinAnimation(clickX, clickY, earnedCoins);
});


