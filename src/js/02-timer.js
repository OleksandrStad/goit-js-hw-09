import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDateEl = document.getElementById('datetime-picker');
const btnStartEl = document.querySelector('[data-start]');

const refField = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let selectedTime;

btnStartEl.setAttribute('disabled', false);

btnStartEl.addEventListener('click', () => {
    start(selectedTime)

})



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = selectedDates[0];
        if (selectedDates[0] < options.defaultDate) {
            btnStartEl.setAttribute('disabled', false);
            alert("Please choose a date in the future");
        } else {
            btnStartEl.removeAttribute('disabled');
        }
    },
};

const calendar = flatpickr(inputDateEl, options);




function start() {
    const timeId = setInterval(countTime, 1000);

    function countTime() {
        // console.log('kbnmv')
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        // console.log(deltaTime);

        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        if (currentTime >= selectedTime) {
            clearInterval(timeId);
            return;
        }
        // console.log(timeComponents);
        refField.days.textContent = days;
        refField.hours.textContent = hours;
        refField.minutes.textContent = minutes;
        refField.seconds.textContent = seconds;
    };
};


function pad(value) {
    return String(value.toString().padStart(2, '0'));
};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
};

