const numbers = [2, 13,3,7,17,5,11,19,9]
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob']
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry']



const sortByLength = (arr) => arr.sort((a,b)=>a.length-b.length);



const sortByLengthAsc=(arr)=>arr.sort((a,b)=>a[0]-a[1]).sort((a,b)=>a.length-b.length)

const sortFrom15=(arr)=>arr.sort((a,b)=>Math.abs(15-a)-Math.abs(15-b))

const addAsterisk=(arr)=>arr.map(item=>`*${item}*`)

const between5And15=(arr)=>arr.filter((num)=>num>5&&num<15)


const isAllOdd = (arr) => arr.every((number) => number % 2 !== 0);

const  hasEven = (arr) => arr.some((number) => number % 2 === 0);

const product = (arr) => arr.reduce((acc, curr) => acc * curr, 1);

console.log(isAllOdd(numbers))


//kérdés: