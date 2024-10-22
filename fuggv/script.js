const numbers = [2, 13, 3, 7, 17, 5, 11, 19, 9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];


function sortByLength(arr) {
    return arr.sort((a, b) => a.length - b.length);
}


function sortByLengthAsc(arr) {
    return arr.sort((a, b) => a.length - b.length || a.localeCompare(b));
}


function sortFrom15(arr) {
    return arr.sort((a, b) => Math.abs(a - 15) - Math.abs(b - 15));
}


function addAsterisk(arr) {
    return arr.map(item => `*${item}*`);
}


function between5And15(arr) {
    return arr.filter(num => num > 5 && num < 15);
}


function isAllOdd(arr) {
    return arr.every(num => num % 2 !== 0);
}


function hasEven(arr) {
    return arr.some(num => num % 2 === 0);
}


function sigma(arr) {
    return arr.reduce((product, num) => product * num, 1);
}


console.log(sortByLength(names)); 
console.log(sortByLengthAsc(fruits)); 
console.log(sortFrom15(numbers));
console.log(addAsterisk(names));
console.log(between5And15(numbers)); 
console.log(isAllOdd(numbers)); 
console.log(hasEven(numbers));
console.log(sigma(numbers)); 