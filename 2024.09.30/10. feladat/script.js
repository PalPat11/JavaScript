function playGame() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;

    let winner;

    if (player1 === player2) {
        winner = "The game is a tie.";
    } else if ((player1 === "1" && player2 === "2") || (player1 === "2" && player2 === "3") || (player1 === "3" && player2 === "1")) {
        winner = "The second player wins.";
    } else {
        winner = "The first player wins.";
    }

    output.innerHTML = winner;
}