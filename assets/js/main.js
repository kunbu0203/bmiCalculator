var btn = document.querySelector('.btn'),
    headAction = document.querySelector('.head-action'),
    headResult = document.querySelector('.head-result');
var result = document.querySelector('.result'),
    resultNum = document.querySelector('.result-num'),
    resultText = document.querySelector('.result-text');
var loopBtn = document.querySelector('.loopBtn');
var datas = [];

btn.addEventListener('click', bmiCalculate, false);

loopBtn.addEventListener('click', bmiCalculate, false);

function bmiCalculate(){
    var inputHeight = Number(document.querySelector('#inputHeight').value),
        inputWeight = Number(document.querySelector('#inputWeight').value);
    if (inputHeight === 0 || inputWeight === 0){
        return;
    }
    var data = {
        status: '',
        statusClass: '',
        bmi : bmi,
        weight : inputWeight,
        height : inputHeight,
    };

    headAction.classList.add('hidden');
    headResult.classList.remove('hidden');

    // 計算BMI
    inputHeight = inputHeight / 100;
    var bmi = inputWeight / (inputHeight ** 2);
    data.bmi = bmi.toFixed(2);

    // 狀態與樣式class
    if (bmi <= 18.5 ){
        data.status = '過輕';
        data.statusClass = 'light';
    } else if (bmi > 25 && bmi <= 30){
        data.status = '過重';
        data.statusClass = 'heavy';
    } else if (bmi > 30 && bmi <= 35){
        data.status = '輕度肥胖';
        data.statusClass = 'mild';
    } else if (bmi > 35 && bmi <= 40){
        data.status = '中度肥胖';
        data.statusClass = 'moderate';
    } else if (bmi > 40){
        data.status = '重度肥胖';
        data.statusClass = 'severe';
    } else {
        data.status = '理想';
    }

    putData(data);
    setData(data);
}

function setData(data) {
    datas.push(data);
    var strData = JSON.stringify(datas);
    localStorage.setItem('bmi', strData);
}

function putData(data) {
    result.className = 'result';
    if (data.statusClass){
        result.classList.add(data.statusClass);
    }
    resultNum.textContent = data.bmi;
    resultText.textContent = data.status;
}