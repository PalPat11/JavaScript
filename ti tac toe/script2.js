var stepcounter = 1;
var dict = {
    'A1': '', 'A2': '', 'A3': '',
    'B1': '', 'B2': '', 'B3': '',
    'C1': '', 'C2': '', 'C3': ''
};

const PLAYER = 'X'; // The bot
const OPPONENT = 'O';


function putSymbol(idOfButton){
    let button = document.getElementById(idOfButton);
    if(stepcounter%2!=0&&dict[idOfButton]===''){
        dict[idOfButton] = PLAYER;
        button.textContent = PLAYER;
        console.log(dict);


        let bestx = findBestMove(dict);

        console.log(findBestMove(dict));
        document.getElementById(findBestMove(dict)).textContent = OPPONENT;
        dict[bestx] = '';
        dict[bestx] = OPPONENT;
        //checkWinner();
        if(checkWinner()==true){
            for (let key in dict){
                dict[key] = ' ';
            }
        }



        stepcounter+=2;
        if(stepcounter===9&&checkWinner()==false){
            document.getElementById("endGame").textContent = 'Döntetlen';
           // alert('Its a draw');

            for (let key in dict){
                dict[key] = ' ';
            }
        }

    }



    
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


function newGame(){
    for (let key in dict) {
        if (dict.hasOwnProperty(key)) {
            dict[key] = ''; // Set the value to an empty string
        }
        let button = document.getElementById(key);
        button.textContent = '';
    }
    stepcounter = 1;
    document.getElementById("endGame").textContent = '';

}


function isWinning(board, player) {
    const winningCombinations = [
        ['A1', 'A2', 'A3'], 
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
        ['A1', 'B2', 'C3'],
        ['A3', 'B2', 'C1']
    ];

    return winningCombinations.some(combination => 
        combination.every(cell => board[cell] === player)
    );
}

function getAvailableMoves(board) {
    return Object.keys(board).filter(cell => board[cell] === '');
}

function minimax(board, depth, isMaximizing) {
    if (isWinning(board, PLAYER)) return 10 - depth;
    if (isWinning(board, OPPONENT)) return depth - 10;
    if (getAvailableMoves(board).length === 0) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const move of getAvailableMoves(board)) {
            board[move] = PLAYER;
            const score = minimax(board, depth + 1, false);
            board[move] = '';
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const move of getAvailableMoves(board)) {
            board[move] = OPPONENT;
            const score = minimax(board, depth + 1, true);
            board[move] = '';
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
}

function findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (const move of getAvailableMoves(board)) {
        board[move] = PLAYER;
        const score = minimax(board, 0, false);
        board[move] = '';

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

