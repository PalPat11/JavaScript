const form = document.querySelector('form');
const inputStringElement = document.querySelector('#inputString');
const resultElement = document.querySelector('#result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputString = inputStringElement.value;
  let result = '';

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (!isNaN(char) || char === ' ') {
      break;
    }
    result += char;
  }

  resultElement.textContent = `The letters are: ${result}`;
});