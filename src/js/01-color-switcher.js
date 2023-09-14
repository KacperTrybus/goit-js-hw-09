function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let interval;

function changeBgColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function startInterval() {
  interval = setInterval(changeBgColor, 1000);
  startBtn.setAttribute('disabled', '');
}

function stopInterval() {
  clearInterval(interval);
  startBtn.removeAttribute('disabled');
}

startBtn.addEventListener('click', startInterval);
stopBtn.addEventListener('click', stopInterval);
