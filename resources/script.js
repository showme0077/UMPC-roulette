let spinning = false;

function spinRoulette() {
    if (spinning) return;
    spinning = true;

    const maxNumber = parseInt(document.getElementById('max-number').value);
    const randomResult = Math.floor(Math.random() * maxNumber) + 1;

    const spins = Math.floor(Math.random() * 10) + 5;
    const rotation = spins * 360 + (randomResult * (360 / maxNumber));

    const rouletteImage = document.getElementById('roulette-image');
    rouletteImage.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        document.getElementById('result').textContent = `결과: ${randomResult}`;
        spinning = false;
    }, 2000);
}