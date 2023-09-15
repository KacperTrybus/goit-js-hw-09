import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let interval;
let selectedDate;

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const btn = document.querySelector('button');
const dateInput = document.getElementById('datetime-picker');

btn.setAttribute('disabled', '');

function addLeadingZero(value) {
  const stringify = value.toString();
  return stringify.padStart(2, '0');
}
function startCountdown() {
  const remainingTime = convertMs(selectedDate - new Date());

  days.innerHTML = addLeadingZero(remainingTime.days);
  hours.innerHTML = addLeadingZero(remainingTime.hours);
  minutes.innerHTML = addLeadingZero(remainingTime.minutes);
  seconds.innerHTML = addLeadingZero(remainingTime.seconds);

  btn.setAttribute('disabled', '');

  if (remainingTime.seconds === 0) {
    clearInterval(interval);
    btn.removeAttribute('disabled');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const today = new Date();

    if (selectedDate < today) {
      window.alert('Please choose a date in the future');
      btn.setAttribute('disabled', '');
    } else {
      btn.removeAttribute('disabled');
      btn.addEventListener('click', startCountdown);
      interval = setInterval(startCountdown, 1000);
    }
  },
};
flatpickr(dateInput, options);
