var lottoszamok = getOtosLotteryNumbers();
var rendezettLottoszamok = getSortedLotteryNumbers();
var jolTippeltSzamok = getNumberOfHits(lottoszamok, [15, 30, 40, 51, 69])
var egyHaviLottoszamok = getMonthlyLotteryArrayNumbers();
var egyediHaviSzamok = getUniqueMonthlyNumbers(egyHaviLottoszamok);
var haviStatisztika = monthlyStatistics(egyHaviLottoszamok);



// 1. 
function getOtosLotteryNumbers() {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 90) + 1);
    }
    return numbers;
  }
  
  // 2. 
  function getSortedLotteryNumbers(arr) {
    return arr.slice().sort((a, b) => a - b);
  }
  
  // 3. 
  function getNumberOfHits(lotteryNumbers, tips) {
    let hits = 0;
    for (let i = 0; i < tips.length; i++) {
      if (lotteryNumbers.includes(tips[i])) {
        hits++;
      }
    }
    return hits;
  }
  
  // 4. 
  function getMonthlyLotteryArrayNumbers() {
    const monthlyNumbers = [];
    for (let i = 0; i < 4; i++) {
      monthlyNumbers.push(getOtosLotteryNumbers());
    }
    return monthlyNumbers;
  }
  
  // 5. 
  function getUniqueMonthlyNumbers(monthlyNumbers) {
    const uniqueNumbers = [];
    for (let i = 0; i < monthlyNumbers.length; i++) {
      for (let j = 0; j < monthlyNumbers[i].length; j++) {
        if (!uniqueNumbers.includes(monthlyNumbers[i][j])) {
          uniqueNumbers.push(monthlyNumbers[i][j]);
        }
      }
    }
    return uniqueNumbers;
  }
  
  // 6. 
  function monthlyStatistics(monthlyNumbers) {
    const statistics = [];
    const uniqueNumbers = getUniqueMonthlyNumbers(monthlyNumbers);
    for (let i = 0; i < uniqueNumbers.length; i++) {
      let frequency = 0;
      for (let j = 0; j < monthlyNumbers.length; j++) {
        for (let k = 0; k < monthlyNumbers[j].length; k++) {
          if (monthlyNumbers[j][k] === uniqueNumbers[i]) {
            frequency++;
          }
        }
      }
      statistics.push([uniqueNumbers[i], frequency]);
    }
    return statistics;
  }