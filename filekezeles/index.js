import fs from 'fs'
import path from 'path'
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url'
//feladat 1

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "dobasok.txt");

let data = '';

try{
    data = fs.readFileSync(filePath, 'utf8');
}
catch(err){
    console.error(err);
}

const array =  data.split(', ');
for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i]);
}
console.log("Feladat 1");
console.log(array.join(', '));


//feladat 2
let counter = 0;
let backStepCounter = 0;

let mezok = [];

for(let i of array){
    counter+=i;
    if(counter%10==0){
        counter-=3;
        backStepCounter++;
    }
    mezok.push(counter);
}

console.log("Feladat 2")
console.log(mezok.join(' '));


console.log("Feladat 3");
console.log(`A játék során ${backStepCounter} alkalommal lépett létrára`);

console.log("Feladat 4");

if(mezok[mezok.length-1] >= 45){
    console.log("A játékot befejezte");
}
else{
    console.log("A játékot abbahagyta");
}


const newNums = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

for(let i = 0; i<18;i++){
    newNums.push(getRandomInt(6)+1);
}

try{
    fs.writeFileSync(filePath, newNums.join(', '));

}
catch(err){
    console.log(err);
}
console.log("Feladat 5");
console.log(newNums);