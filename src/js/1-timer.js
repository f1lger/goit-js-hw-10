import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import iconDone from '../img/bi_x-octagon.svg'

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

let userSelectedDate;
let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0] - Date.now();
    if (userSelectedDate <= 0) {
      iziToast.error(iziToastConfig);
      startBtn.setAttribute('disabled', true);
      return;
    }
    startBtn.removeAttribute('disabled');
    input.setAttribute('disabled', true);
  },
};

const valueOftimer = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const updateTime = () => {
  const { days, hours, minutes, seconds } = convertMs(
    (userSelectedDate -= 1000)
  );

  valueOftimer.days.textContent = days;
  valueOftimer.hours.textContent = hours;
  valueOftimer.minutes.textContent = minutes;
  valueOftimer.seconds.textContent = seconds;

  if (!Number(days) && !Number(hours) && !Number(minutes) && !Number(seconds))
    clearInterval(interval);
};

const onStartClick = () => {
  interval = setInterval(updateTime, 1000);
  startBtn.setAttribute('disabled', true);
};

startBtn.addEventListener('click', onStartClick);

const iziToastConfig = {
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',
  backgroundColor: '#EF4040',
  titleColor: '#ffffff',
  messageColor: '#ffffff',
  iconColor: '#ffffff',
  iconUrl: iconDone,
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addStartingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addStartingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addStartingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addStartingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addStartingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(input, options);
