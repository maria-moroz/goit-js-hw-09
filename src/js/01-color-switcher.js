const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

let timerId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    refs.stopBtn.disabled = false;
    refs.startBtn.disabled = true;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopBtnClick() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}