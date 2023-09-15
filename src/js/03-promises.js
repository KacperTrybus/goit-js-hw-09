function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    console.log('fullfilled');
    // Fulfill aaaa
  } else {
    console.log('rejected');
    // Reject
  }
}

let maxTime;
const firstDelay = document.querySelector('input[name=delay]');
const stepDelay = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const btn = document.querySelector('button');

btn.addEventListener('click', function (event) {
  event.preventDefault();
  const firstDelayValue = Number(firstDelay.value);
  const stepDelayValue = Number(stepDelay.value);
  const amount = Number(amountInput.value);

  setTimeout(createPromise, firstDelayValue);
  clearTimeout(createPromise);
  for (let i = 2; i <= amount; i++) {
    setTimeout(createPromise, stepDelayValue);
  }
});
