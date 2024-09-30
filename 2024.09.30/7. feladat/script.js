function getDivisors() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let num = 10;
    while (num <= 30) {
        let divisors = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                divisors.push(i);
            }
        }
        output.innerHTML += `${num}: ${divisors.join(", ")},<br>`;
        num++;
    }
}