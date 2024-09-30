function calculateBMI() {
    const mass = document.getElementById("mass").value;
    const height = document.getElementById("height").value;
  
    const bmi = mass / (height * height);
  
    document.write(`BMI: ${bmi.toFixed(2)}`);
  }