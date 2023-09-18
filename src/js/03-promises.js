const firstDelay = document.querySelector('input[name=delay]');
const stepDelay = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const btn = document.querySelector('button');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    //nowy promise dla ktorego robi sie funkcja
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise // wywoluje promise
    .then(({ position, delay }) => {
      //jak resolved
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      // jak rejected
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  btn.setAttribute('disabled', '');

  const firstDelayValue = Number(firstDelay.value);
  const stepDelayValue = Number(stepDelay.value);
  const amount = Number(amountInput.value);

  let createdPromiseCount = 0;

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelayValue + (i - 1) * stepDelayValue; // zapisywanie delaya dla loga
    createPromise(i, currentDelay).then(() => {
      createdPromiseCount++; // zwiekszenie licznika wykonanych funkcji

      if (createdPromiseCount === amount) {
        submitButton.removeAttribute('disabled');
      }
    });
  }
});
