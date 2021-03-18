var btn = document.querySelector('.btn'),
    headAction = document.querySelector('.head-action'),
    headResult = document.querySelector('.head-result');
var result = document.querySelector('.result'),
    resultNum = document.querySelector('.result-num'),
    resultText = document.querySelector('.result-text');
var loopBtn = document.querySelector('.loopBtn');

btn.addEventListener('click', function (e){
    e.preventDefault();

    headAction.classList.add('hidden');
    headResult.classList.remove('hidden');

    bmiCalculate()
});

loopBtn.addEventListener('click', function (e){
    e.preventDefault();

    bmiCalculate()
});

function bmiCalculate(){
    var inputHeight = Number(document.querySelector('#inputHeight').value),
        inputWeight = Number(document.querySelector('#inputWeight').value);

    inputHeight = inputHeight / 100;
    var bmi = inputWeight / (inputHeight ** 2);
    if (!bmi){
        bmi = 0;
    }
    resultNum.textContent = bmi.toFixed(2);

    bmiStatus(bmi);
}

function bmiStatus(bmi) {
    result.className = 'result';
    if (bmi <= 18.5 ){
        result.classList.add('light');
        resultText.textContent = '過輕';
    } else if (bmi > 25 && bmi <= 30){
        result.classList.add('heavy');
        resultText.textContent = '過重';
    } else if (bmi > 30 && bmi <= 35){
        result.classList.add('mild');
        resultText.textContent = '輕度肥胖';
    } else if (bmi > 35 && bmi <= 40){
        result.classList.add('moderate');
        resultText.textContent = '中度肥胖';
    } else if (bmi > 40){
        result.classList.add('severe');
        resultText.textContent = '重度肥胖';
    } else {
        resultText.textContent = '理想';
    }
}