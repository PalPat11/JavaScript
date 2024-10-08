import input from './input.js';

let currentH = parseInt( await input("adja meg hány ora van? "));
let currentM = parseInt( await input("adja meg hány perc van? "));
let currentS = parseInt( await input("adja meg hány másodperc van? "));

let allCurrentSecs = (currentH*3600)+(currentM*60 )+(currentS);
let secsLeft = 86400-allCurrentSecs;
console.log(`Hátra van még ${secsLeft}S`)