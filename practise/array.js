function getOtosLotteryNumbers(){
    const numbers = [];
    while(numbers.length<5){
        const randomNum = Math.floor(Math.random()*90)+1;
        if(!numbers.includes(randomNum)){
            numbers.push(randomNum);
        }
    }
    return numbers;
}

function getSortedtLotteryNumbers (arr){

    return arr.sort((a,b)=>a-b);
}

function getNumberOfHits(hits, numbers){
    return hits.filter(num=>numbers.includes(num)).length;
} 

const getMonthlyLotteryArrayNumbers = ()=>{
 const arr = [];
    for(let i=0;i<4;i++){
        arr.push(getOtosLotteryNumbers());
    }
    return arr;
}

const getMonthlyLotteryArrayUniqueNumbers=(getMonthlyLotteryArrayNumbers) =>{
    const arr = Array.from(new Set(getMonthlyLotteryArrayNumbers.flat()));
    return arr;
}

function monthlyStatistics(monthlyNumbersArray) {
    const flatArr = monthlyNumbersArray.flat();
    const stats = [];
    const uniqueNumbers = [...new Set(flatArr)];
    uniqueNumbers.forEach(num => {
        const count = flatArr.filter(n => n === num).length;
        stats.push([num, count]);
    });
    return stats;
}