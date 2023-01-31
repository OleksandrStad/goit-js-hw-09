function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

btnStartEl.addEventListener('click', onBtnStartClick);

function onBtnStartClick(e) {
    console.log('mnbnv')

    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);


};




btnStopEl.addEventListener('click', onBtnStopClick);

function onBtnStopClick(e) {
    console.log('!!!!')
    clearInterval(timerId);

};


