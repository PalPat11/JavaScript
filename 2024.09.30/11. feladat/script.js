function calculateFactorial() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let number = document.getElementById("number").value;
    let factorial = 1;

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }

    output.innerHTML = `${number} factorial is ${factorial}.`;
}