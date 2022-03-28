import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-notify-aio-3.2.5.min.js";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

const notifyOptions = {
  timeout: 5000,
  useIcon: false,
};

let currentDelay = null;
let currentPosition = 0;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = parseInt(refs.amount.value, 10);
  const step = parseInt(refs.step.value, 10);
  currentDelay = parseInt(refs.delay.value, 10);
  currentPosition = 0;

  while (currentPosition < amount) {
    currentPosition += 1;
    callPromise(currentPosition, currentDelay);
    currentDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}

function callPromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notifyOptions);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notifyOptions);
    });
}