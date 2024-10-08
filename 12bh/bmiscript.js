import input from './input.js';

let weight = await input(`Adja meg a súlyt:`);
let height = await input(`Adja meg a magasságot:`);
console.log(height);    

let bmi = weight/Math.pow(height, 2);

console.log(`${bmi} a test zsir százalék`)

