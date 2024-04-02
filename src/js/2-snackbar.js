import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconDone from '../img/bi_check2-circle.svg';
import iconError from '../img/bi_x-octagon.svg';

const iziToastConfig = {
  position: 'topRight',
  maxWidth: '383px',
  titleColor: '#ffffff',
  messageColor: '#ffffff',
};

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function promiseGenerator(isFulfilled, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) resolve(delay);
      else reject(delay);
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, state } = e.target.elements;
  promiseGenerator(state.value === 'fulfilled', Number(delay.value))
    .then(() => {
      iziToast.success({
        ...iziToastConfig,
        title: 'OK',
        message: `Fulfilled promise in ${delay.value}ms`,
        backgroundColor: '#59A10D',
        iconUrl: iconDone,
      });
    })
    .catch(() => {
      iziToast.error({
        ...iziToastConfig,
        title: 'Error',
        message: `Rejected promise in ${delay.value}ms`,
        backgroundColor: '#EF4040',
        iconUrl: iconError,
      });
    });
}
