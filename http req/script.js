import { title } from "process";
import input  from "./input.js";
import { json } from "stream/consumers";





function httpReqGET(id){

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(json => console.log(json));

}

function httpReqPOST(userid, title, body){

    fetch('https://jsonplaceholder.typicode.com/todos',{
        "method": "POST",
        "body":JSON.stringify({
            title: title,
            body: body,
            userId: userid,
            
        }),
        "headers": {
            'Content-type':'application/json; charset=UTF-8',
        },

        })
        .then(response => response.json())
        .then(json => console.log(json));
}

function httpReqPUT(id, title, body, userid){
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        "method": "PUT",
        "body":JSON.stringify({
            title: title,
            body: body,
            userId: userid,
            
        }),
        "headers": {
            'Content-type':'application/json; charset=UTF-8',
        },
    
        })
        .then(response => response.json())
        .then(json => console.log(json));
}

function httpReqDELETE(id){
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        "method":"DELETE",
        });
    
}

function httpReqPATCH(){
    fetch('https://jsonplaceholder.typicode.com/todos/1',{
        "method": "PATCH",
        "body":JSON.stringify({
            title: 'foo3',
        }),
        "headers": {
            "Content-type":'application/json; charset=UTF-8',
        },
    })
    .then((response)=>response.json())
    .then(json=>console.log(json))
    
}

