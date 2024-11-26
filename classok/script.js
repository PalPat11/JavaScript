import input from './input.js';

class Person{
    constructor(name, email){
        this.name = name,
        this.email = email
    }

    print(){
        console.log(`Név: ${this.name}, Email: ${this.email}`);
    }
}






let numOfData = await input("Hány adatot szeretne felvinni?");
let array = [];

for (let i = 0; i < numOfData; i++) {
    let data = await input("Adja meg a nevét: ");
    let data2 = await input("Adja meg az emailt: ");
    let tempPerson = new Person(data, data2);
    array.push(tempPerson); 
    
}


for(let i of array){
    i.print();
}



