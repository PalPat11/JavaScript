function getRemainingSeconds() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let currentHours = 14;
    let currentMinutes = 34;
    let currentSeconds = 42;

    let totalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
    let remainingSeconds = 86400 - totalSeconds; // 86400 is the total number of seconds in a day

    output.innerHTML = `Remaining seconds: ${remainingSeconds}`;
}