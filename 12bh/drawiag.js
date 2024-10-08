import input from './input.js';

const boxSize = await input("Adja nmeg a doboz méretét: ");
let result = "";
for (let index = 0; index < boxSize; index++) {
    for (let j = 0; j < boxSize; j++) {
        if(index ===0 || index===boxSize || index===j || j === boxSize-1 || j ===0){
            result+="%";
            continue;
        }
        result+=" ";
    }
    result += "\n";
}

console.log(result)