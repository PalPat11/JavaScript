
var stepcounter = 1;
const dict = {
    'A1': '',
    'A2': '',
    'A3': '',
    'B1': '',
    'B2': '',   
    'B3': '',
    'C1': '',
    'C2': '',
    'C3': ''
};
function putSymbol(idOfButton) {

    let button = document.getElementById(idOfButton);
    if(stepcounter%2==0){
        if(dict[idOfButton]===''){
            dict[idOfButton] = 'O';
            button.textContent = 'O';
            stepcounter++;
            //checkWinner();
            if(checkWinner()==true){
                for (let key in dict){
                    dict[key] = ' ';
                }
            }
        }

    }
    else{
        
        if(dict[idOfButton]===''){
            dict[idOfButton] = 'X';
            button.textContent = 'X';
            stepcounter++;
            //checkWinner();
            if(checkWinner()==true){
                for (let key in dict){
                    dict[key] = ' ';
                }
            }
        }
    }
    console.log(dict)

    if(stepcounter===10&&checkWinner()==false){
        document.getElementById("endGame").textContent = 'Döntetlen';
        //alert('Its a draw');
    }

    
}

function newGame(){
    for (let key in dict) {
        if (dict.hasOwnProperty(key)) {
            dict[key] = ''; // Set the value to an empty string
        }
        let button = document.getElementById(key);
        button.textContent = '';
    }
    stepcounter = 1;
}


function checkWinner(){
    if(dict.A1=='X'&&dict.A2=='X'&&dict.A3=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A1=='O'&&dict.A2=='O'&&dict.A3=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.B1=='X'&&dict.B2=='X'&&dict.B3=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.B1=='O'&&dict.B2=='O'&&dict.B3=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.C1=='X'&&dict.C2=='X'&&dict.C3=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.C1=='O'&&dict.C2=='O'&&dict.C3=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.A1=='X'&&dict.B1=='X'&&dict.C1=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A1=='O'&&dict.B1=='O'&&dict.C1=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.A2=='X'&&dict.B2=='X'&&dict.C2=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A2=='O'&&dict.B2=='O'&&dict.C2=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.A3=='X'&&dict.B3=='X'&&dict.C3=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A3=='O'&&dict.B3=='O'&&dict.C3=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.A1=='X'&&dict.B2=='X'&&dict.C3=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A1=='O'&&dict.B2=='O'&&dict.C3=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else if(dict.A3=='X'&&dict.B2=='X'&&dict.C1=='X'){
        //alert('X wins');
         document.getElementById("endGame").textContent = 'X nyert';
        return true;
    }
    else if(dict.A3=='O'&&dict.B2=='O'&&dict.C1=='O'){
        //alert('O wins');
         document.getElementById("endGame").textContent = 'O nyert';
        return true;
    }
    else{
        return false;
    }


}
