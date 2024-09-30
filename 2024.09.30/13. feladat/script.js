function generateSequence() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let sequence = [];
    let count = 0;

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0) {
            count++;
            if (count > 1) {
                sequence.push(i);
            }
        } else {
            sequence.push(i);
        }
    }

    output.innerHTML = sequence.join(", ");
}