const form = document.querySelector('form');
const input = document.querySelector('#number');
const resultElement = document.querySelector('#result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const number = input.value;
  const digits = number.toString().split('');
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i]);
  }

  const average = sum / digits.length;
  resultElement.textContent = `The average of digits is ${average.toFixed(6)}`;
});