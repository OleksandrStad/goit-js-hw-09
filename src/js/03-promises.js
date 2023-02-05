

const ref = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amout: document.querySelector('input[name="amount"]'),
  btn: document.querySelector('button '),
  form: document.querySelector('.form'),

};

ref.form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { amount, step, delay },
  } = e.currentTarget;
  let numDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, numDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);

      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);

      });
    numDelay += Number(step.value);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}