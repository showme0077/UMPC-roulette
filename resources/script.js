let spinning = false;

function drawNumbers(maxNumber) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const numbersContainer = document.getElementById("numbers");
    const sectorsContainer = document.getElementById("sectors");
    numbersContainer.innerHTML = '';  // Clear previous numbers
    sectorsContainer.innerHTML = ''; // Clear previous sectors

    const colors = ['#FFDDDD', '#DDEEFF', '#DDFFDD', '#FFFFDD', '#FFDDBB', '#DDBBFF']; // Example colors

    for (let i = 0; i < maxNumber; i++) {
        const startAngle = i * (360 / maxNumber);
        const endAngle = (i + 1) * (360 / maxNumber);
        const x1 = 100 + 90 * Math.cos(startAngle * Math.PI / 180);
        const y1 = 100 + 90 * Math.sin(startAngle * Math.PI / 180);
        const x2 = 100 + 90 * Math.cos(endAngle * Math.PI / 180);
        const y2 = 100 + 90 * Math.sin(endAngle * Math.PI / 180);

        // Draw sector
        const sector = document.createElementNS(svgNamespace, "path");
        sector.setAttribute("d", `M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`);
        sector.setAttribute("fill", colors[i % colors.length]);
        sectorsContainer.appendChild(sector);

        // Draw number
        const angle = (i + 0.5) * (360 / maxNumber);
        const x = 100 + 70 * Math.cos(angle * Math.PI / 180);
        const y = 100 + 70 * Math.sin(angle * Math.PI / 180);

        const numberElement = document.createElementNS(svgNamespace, "text");
        numberElement.setAttribute("x", x);
        numberElement.setAttribute("y", y);
        numberElement.setAttribute("text-anchor", "middle");
        numberElement.setAttribute("dominant-baseline", "middle");
        numberElement.textContent = (i + 1).toString();
        numbersContainer.appendChild(numberElement);
    }
}

function spinRoulette() {
    if (spinning) return;
    spinning = true;

    const maxNumber = parseInt(document.getElementById('max-number').value);
    const randomResult = Math.floor(Math.random() * maxNumber) + 1;

    const spins = Math.floor(Math.random() * 10) + 5;
    const rotation = spins * 360 - (randomResult - 0.5) * (360 / maxNumber);

    const rouletteSvg = document.getElementById('roulette-svg');
    rouletteSvg.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        document.getElementById('result').textContent = `결과: ${randomResult}`;
        spinning = false;
    }, 2000);
}

// Initial draw for default value of 10
drawNumbers(10);
