async function getCars() {
    try{
        const response = await fetch('https://surveys-5jvt.onrender.com/api/cars/');
        const data = await response.json();
        return data;
    }
    catch(ex){
        console.log(ex);
    }
}

let alm = await getCars();
//console.log(alm)


async function getCarById (id) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`);
        const data = await response.json();
        return data;
    }
    catch(ex){
        console.log(ex);
    }
}
let alm2 = await getCarById(1);
//console.log(alm2)


async function createCar  (modelName, brandName, year2) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/`,{
            method: 'POST',
            body: JSON.stringify({
                model: `${modelName}`,
                brand: `${brandName}`,
                year: year2,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        const data = await response.json();
        return data;
    }
    catch(ex){
        console.log(ex);
    }
}
let alm3 = await getCarById("alma", "banan", 2001);
console.log(alm3)


async function updateCar(id, modelName, brandName, year2) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                model: `${modelName}`,
                brand: `${brandName}`,
                year: year2,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        const data = await response.json();
        return data;
    }
    catch(ex){
        console.log(ex);
    }
}
let alm4 = await getCarById(1, "alma", "banan", 2001);
console.log(alm4)

async function deleteCar(id) {

    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`,{
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

let alm5 = await deleteCar(1);
console.log(alm5)