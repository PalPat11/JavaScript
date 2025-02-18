import express from 'express';
import __dirname from './util/utilPath.js'

const app = express();

const users = [
    { id:1, firstName: "Harry", lastName: "Potter" },
    { id:2, firstName: "Ronald", lastName: "Bilius Weasley" },
    { id:3, firstName: "Hermione", lastName: "Jean Granger" },
    { id:4, firstName: "Draco", lastName: "Malfoy" },
    { id:5, firstName: "Cedric", lastName: "Diggory" },
    { id:6, firstName: "Luna", lastName: "Lovegood" },
  ]


app.use(express.json())


app.get('/users', (req, res)=>{
    res.json(users)
})

app.get('/users/:param', (req, res)=>{
    const param = req.params.parameter;
    res.json(users[param-1])
})

app.post('/users', (req, res)=>{
    const {firstName, lastName} = req.body
    res.json({firstName, lastName})
})

app.patch('/users/:id', (req, res)=>{
    const param = req.params.parameter;
    users.map((user)=>{
        if(user.id==param){
            user = req.body
            res.json(user)

        }
    })
})

app.put('/users', (req, res)=>{
    res.send()
})

app.delete('/users/:id', (req, res)=>{
    res.send()
})

