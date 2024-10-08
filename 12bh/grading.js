import input from './input.js';

const grade = await input(`Add meg az érdemjegyet: `);

var american = ""; 
switch (grade){
    case '1':
        american = "F";
        break;
    case '2':
        american = "D";
        break;
    case '3':
        american = "C";
        break;
    case '4':
        american = "B";
        break;
    case 5:
        american = "A";
        break;
    default:
        american = "Nem Jó adatot adtál meg."
        break;

}

console.log(`A jegyed: ${american}`)