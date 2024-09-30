function drawSquare() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let size = document.getElementById("size").value;
    let square = "";

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i === j || i + j === size - 1) {
                square += "%";
            } else {
                square += " ";
            }
        }
        square += "\n";
    }

    output.innerHTML = square;
}