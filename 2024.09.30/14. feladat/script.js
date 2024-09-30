function playFizzBuzz() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let sequence = [];

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            sequence.push("fizzbuzz");
        } else if (i % 3 === 0) {
            sequence.push("fizz");
        } else if (i % 5 === 0) {
            sequence.push("buzz");
        } else {
            sequence.push(i);
        }
    }

    output.innerHTML = sequence.join(", ");
}