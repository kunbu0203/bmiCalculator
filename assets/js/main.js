var inputHeight = document.querySelector('#inputHeight'),
    inputWeight = document.querySelector('#inputWeight');
var btn = document.querySelector('.btn'),
    headAction = document.querySelector('.head-action'),
    headResult = document.querySelector('.head-result');
var result = document.querySelector('.result'),
    resultNum = document.querySelector('.result-num'),
    resultText = document.querySelector('.result-text');
var loopBtn = document.querySelector('.loopBtn');
var record = document.querySelector('.record');
var recordData = JSON.parse(localStorage.getItem('bmi')) || [];

btn.addEventListener('click', bmiCalculate, false);

loopBtn.addEventListener('click', function (){
    inputHeight.value = '';
    inputWeight.value = '';

    headResult.classList.add('hidden');
    headAction.classList.remove('hidden');
}, false);

function bmiCalculate(){
    var height = Number(inputHeight.value),
        weight = Number(inputWeight.value);
    if (height === 0 || weight === 0){
        return;
    }
    var data = {
        status: '',
        statusClass: '',
        bmi : bmi,
        weight : weight,
        height : height,
    };

    headAction.classList.add('hidden');
    headResult.classList.remove('hidden');

    // 計算BMI
    height = height / 100;
    var bmi = weight / (height ** 2);
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

    putDataToHtml(data);
    setData(data);
    updateRecord();
}

function setData(data) {
    recordData.push(data);
    var strData = JSON.stringify(recordData);
    localStorage.setItem('bmi', strData);
}

function putDataToHtml(data) {
    result.className = 'result';
    if (data.statusClass){
        result.classList.add(data.statusClass);
    }
    resultNum.textContent = data.bmi;
    resultText.textContent = data.status;
}

function updateRecord() {
    var contentBox = document.querySelector('.content');
    var date = new Date()

    contentBox.innerHTML = '';

    if (recordData) {
        for (var i = recordData.length - 1; i >= 0; i--) {
            var recordClone = record.cloneNode(true);
            if (recordData[i].statusClass) {
                recordClone.classList.add(recordData[i].statusClass);
            }
            recordClone.querySelector('.record-status').textContent = recordData[i].status;
            recordClone.querySelector('#recordBmi').textContent = recordData[i].bmi;
            recordClone.querySelector('#recordWeight').textContent = recordData[i].weight;
            recordClone.querySelector('#recordHeight').textContent = recordData[i].height;
            recordClone.querySelector('.month').textContent = (date.getMonth()+1).toString().padStart(2, '0');
            recordClone.querySelector('.day').textContent = date.getDate();
            recordClone.querySelector('.year').textContent = date.getFullYear();

            contentBox.appendChild(recordClone);
        }
    }
}

window.onload = updateRecord();