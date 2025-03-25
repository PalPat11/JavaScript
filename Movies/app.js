import express, { json } from 'express';
const PORT = 3010;

const app = express();
app.use(express.json())


const movies = [{
    "title": "Star Wars",
    "director":"George Lucas",
    "release_year":1977,
    "is_oscar_winner":true
},
{
    "title": "Lord of the Rings",
    "director":"Peter Jackson",
    "release_year":1999,
    "is_oscar_winner":true
},
{
    "title": "Matrix",
    "director":"Wachowski brothers",
    "release_year":1999,
    "is_oscar_winner":true
},
];

// req.params.id 
app.get("/movies", (req, res)=>{
    return res.json(movies);
})


app.get("/movies/:id", (req, res)=>{
    var id = req.params.id;
    if(id>movies.length){
        return res.json({"response":"Nincs ilyen adat"});
    }
    else{
        return res.json(    movies[id-1]);

    }
})

app.delete("/movies/:id", (req, res)=>{
    var id = req.params.id;
    if(id>movies.length){
        return res.json({"response":"Nincs ilyen adat"});
    }
    else{
        movies.splice(id);
        return res.json(movies);

    }
})



app.post("/movies", (req, res)=>{
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const is_oscar_winner = req.body.is_oscar_winner;

    if(title && director && release_year){

        movies.push({
            title : title,
            director : director,
            release_year:release_year,
            is_oscar_winner : is_oscar_winner
        })
        return res.json(movies)
    }
    else{
        return res.json({"message": "nem jok az adatok"})
    }


})


app.put("/movies/:id", (req, res)=>{
    var id = req.params.id;
if(req.body.title&&req.body.director&&req.body.release_year&&id<=movies.length){
    movies[id-1] = req.body;
    return res.json({"message":"Sikeres"})
}
else{
    return res.json({"message":"Sikertelen"})
    
}
})



app.get("/", (req,res)=>{
    return "Helo";
})

app.listen(PORT, ()=>{
    console.log(`Runs on port: ${PORT}`)
})