

class Day{
    constructor(name, orakListaja){
        this.name = name,
        this.orakListaja = orakListaja

    }
    print(){
        console.log(this.name);
        for (let i of this.orakListaja){
            console.log(`\t${i}`);
        }
    }
}

let array = [];

array.push(new Day("Hétfő", ["Irodalom", "Matek", "Angol"]));
array.push(new Day("Kedd", ["Töri", "angol", "Matek"]));
array.push(new Day("Szerda", ["Irodalom", "Német", "Angol"]));
array.push(new Day("Csütörtök", ["Spanyol", "Matek", "Angol"]));
array.push(new Day("Péntek", ["Irodalom", "Matek", "Matek"]));

for(let i of array){
    i.print();
}