import express from 'express';
const path = require('path');

import __dirname from './util/utilPath.js'

const app = express();


/* app.get('/', (req, res)=>{
    res.send('Hello')
})
 */

app.get('/', (req, res)=>{
    res.sendFile("./views/index.html", {root : __dirname})
    
})

app.get('/car', (req, res)=>{
    res.sendFile("./views/car.html", {root : __dirname})
    
})


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'car.html'));
});
app.listen(3000, ()=>{
    console.log('service runs on port 3000');
});