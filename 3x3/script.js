function shuffleNumbers() {
    const numbers = Array.from(document.querySelectorAll('.number'));
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('numberGrid');
    grid.innerHTML = '';
    shuffled.forEach(num => grid.appendChild(num));
}