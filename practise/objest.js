import input from "./input.js";

const data = await input("Addj meg egy hány adatot adna meg:")
const n = Number(data)
const adatok = []

while(isNaN(n) || n<=0){
    const data = await input("Hibás adat, adjon meg egy pozitív számot:")
    n = Number(data)
}

for(let i=0;i<n;i++){
    const name = await input(`Adja meg a(z) nevet:`)
    const email = await input(`Adja meg a(z) emailt. adatot:`)

    adatok.push({name:name, email:email})
}

console.log(adatok)