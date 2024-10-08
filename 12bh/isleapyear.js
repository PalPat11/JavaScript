import input from './input.js';

const year = await input("Adja meg az évet: ");
//nem jou
if(year%4==0){
    console.log(`${year} szökőév`);
}
else{
    console.log(`${year} NEM szökőév`);

}