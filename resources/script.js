function showLoadingAndResult() {
    const maxNumber = parseInt(document.getElementById("max-number").value);
    const drawCount = document.getElementById("draw-count").value ? parseInt(document.getElementById("draw-count").value) : 1;
    if(maxNumber < drawCount) {
        document.getElementById("result").innerText = "잘못된선택";
    } else{
        let excludeValues = document.getElementById("exclude-values").value;

        excludeValues = excludeValues ? excludeValues.split(',').map(val => parseInt(val)).filter(val => !isNaN(val) && val <= maxNumber) : [];

        // 결과를 얻기 전 로딩 애니메이션 보여주기
        document.querySelector(".loading-animation").style.display = "block";
        document.querySelector("#result").style.display = "none";
        setTimeout(() => {
            const results = drawNumbers(maxNumber, drawCount, excludeValues);
            document.getElementById("result").innerText = "축하합니다!! 당첨번호는: " + results.join(', ') + "입니다.";
            document.querySelector(".loading-animation").style.display = "none";
            document.querySelector("#result").style.display = "block";
        }, 3500);  // 3.5초 후 결과 보여주기
    }
    
}

function drawNumbers(maxNumber, drawCount, excludeValues) {
    const availableNumbers = Array.from({length: maxNumber}, (_, i) => i + 1).filter(val => !excludeValues.includes(val));
    const results = [];
    for (let i = 0; i < drawCount; i++) {
        if (availableNumbers.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        results.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
    }
    return results;
}

function order(results){

}

window.onload = function() {
    const maxNumber = parseInt(document.getElementById("max-number").value);
    const selectBox = document.getElementById("draw-count");
    for(let i = 1; i <= maxNumber; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectBox.appendChild(option);
    }
    selectBox.value = "1";  // Set default draw count to 1
}
