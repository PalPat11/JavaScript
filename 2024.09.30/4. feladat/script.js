const inputString = document.getElementById('input-string');
const submitBtn = document.getElementById('submit-btn');
const outputDiv = document.getElementById('output');

submitBtn.addEventListener('click', () => {
  const myString = inputString.value;
  let output = '';

  for (let i = 0; i < myString.length; i++) {
    output += `${myString[i]}<br>`;
  }

  outputDiv.innerHTML = output;
});