let spinning = false;

function drawNumbers(maxNumber) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const numbersContainer = document.getElementById("numbers");
    numbersContainer.innerHTML = '';  // Clear previous numbers

    for (let i = 1; i <= maxNumber; i++) {
        const angle = (i * (360 / maxNumber) - (360 / (2 * maxNumber))) * (Math.PI / 180);
        const x = 100 + 80 * Math.cos(angle);
        const y = 100 + 80 * Math.sin(angle);

        const numberElement = document.createElementNS(svgNamespace, "text");
        numberElement.setAttribute("x", x);
        numberElement.setAttribute("y", y);
        numberElement.setAttribute("text-anchor", "middle");
        numberElement.setAttribute("dominant-baseline", "middle");
        numberElement.textContent = i.toString();

        numbersContainer.appendChild(numberElement);
    }
}

document.getElementById('max-number').addEventListener('change', function() {
    drawNumbers(this.value);
});

function spinRoulette() {
    if (spinning) return;
    spinning = true;

    const maxNumber = parseInt(document.getElementById('max-number').value);
    const randomResult = Math.floor(Math.random() * maxNumber) + 1;

    const spins = Math.floor(Math.random() * 10) + 5;
    const rotation = spins * 360 + ((randomResult - 0.5) * (360 / maxNumber));

    const rouletteSvg = document.getElementById('roulette-svg');
    rouletteSvg.style.transform = `rotate(-${rotation}deg)`;

    setTimeout(() => {
        document.getElementById('result').textContent = `결과: ${randomResult}`;
        spinning = false;
    }, 2000);
}

// Initial draw for default value of 10
drawNumbers(10);
