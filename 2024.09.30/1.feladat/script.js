function calculate() {
    const length = document.getElementById("length").value;
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
  
    const surfaceArea = 2 * (length * width + width * height + height * length);
    const volume = length * width * height;
  
    //document.getElementById("result").innerHTML = `Surface Area: ${surfaceArea.toFixed(2)}<br>Volume: ${volume.toFixed(2)}`;
    document.write(`Surface Area: ${surfaceArea.toFixed(2)}<br>Volume: ${volume.toFixed(2)}`);

  }