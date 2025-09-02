const tomb = [1,2,6,2,8,5,4,4,3,6]

/* const end = []

const hossz = tomb.length

for(let i = 0; i<hossz;i++){
    if(!end.includes(tomb[i])){
        end.push(tomb[i]);
    }
}
 */
console.log(...new Array(...new Set(tomb)));
//console.log(end)