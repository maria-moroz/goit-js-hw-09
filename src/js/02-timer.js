import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-notify-aio-3.2.5.min.js";

const refs = {
    datetimePicker: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
}

let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        selectedDate = selectedDates[0];
        checkDateIsValid(selectedDate);
    },
};

flatpickr(refs.datetimePicker, options);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    const isValid = checkDateIsValid(selectedDate);
    if (!isValid) {
        return;
    }

    refs.datetimePicker.disabled = true;
    refs.startBtn.disabled = true;

    const timer = setInterval(() => {
        const currentDate = Date.now();
        const deltaDate = selectedDate - currentDate;
        const convertedDate = convertMs(deltaDate);

        if (deltaDate<0) {
            clearInterval(timer);
            return;
        }

        onTimerExpiredColorChange(deltaDate);
        displayDate(convertedDate);

    }, 1000);
}

function displayDate({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function onTimerExpiredColorChange(date) {
    if (date < 11000) {
        refs.timer.classList.add('timer-expired');
    }
}

function checkDateIsValid(date) {
    if (date > Date.now()) {
        refs.startBtn.disabled = false;
        return true;
    }
    Notify.failure('Please choose a date in the future');
    refs.startBtn.disabled = true;
    return false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}