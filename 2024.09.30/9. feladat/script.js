function getLetterGrade() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let score = document.getElementById("score").value;
    let letterGrade;

    if (score >= 90) {
        letterGrade = "A";
    } else if (score >= 80) {
        letterGrade = "B";
    } else if (score >= 70) {
        letterGrade = "C";
    } else if (score >= 60) {
        letterGrade = "D";
    } else {
        letterGrade = "F";
    }

    output.innerHTML = `Letter grade: ${letterGrade}`;
}function getLetterGrade() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let score = document.getElementById("score").value;
    let letterGrade;

    if (score >= 90) {
        letterGrade = "A";
    } else if (score >= 80) {
        letterGrade = "B";
    } else if (score >= 70) {
        letterGrade = "C";
    } else if (score >= 60) {
        letterGrade = "D";
    } else {
        letterGrade = "F";
    }

    output.innerHTML = `Letter grade: ${letterGrade}`;
}