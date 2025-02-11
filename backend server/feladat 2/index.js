import express from 'express';
import __dirname from './util/utilPath.js'

const app = express();


/* app.get('/', (req, res)=>{
    res.send('Hello')
})
 */

app.get('/index', (req, res)=>{
    res.sendFile("./views/index.html", {root : __dirname})
    
})

app.listen(3001, ()=>{
    console.log('service runs on port 3000');
});