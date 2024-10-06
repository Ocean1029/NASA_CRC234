const roundElement = document.getElementById('round');
const financeElement = document.getElementById('finance');
const greenElement = document.getElementById('green');
const fossilElement = document.getElementById('fossil');
const elecSumElement = document.getElementById('elec-sum');
const supportElement = document.getElementById('support');
const fossilCountElement = document.getElementById('fossil-count');
const buildGreenButton = document.getElementById('build-green');
const buildFossilButton = document.getElementById('build-fossil');
const removeFossilButton = document.getElementById('remove-fossil');
const resultElement = document.getElementById('result');

let round = 1;
let finance = 100;
let fossil = 3900;
let green = 100;
let support = 100;
let fossilCount = 13; // 追蹤石化設施數量

let greenPower = 200;
let fossilFee = 1;
let carbonFee = 0;
let mineIncome = 0;
let isCarbonCreditOpened = false;
let isairProtest = false;
let issolarProtest = false;
let isMineDiscovered = false;
let isTribeProtest = false;
let tribeSelect = 0;
let mineLicense = 0;

function initGame() {
    round = 1;
    finance = 100;
    fossil = 3900;
    green = 100;
    support = 100;
    fossilFee = 1;
    fossilCount = 13;
    greenPower = 200;
    updateInfo();
}


function updateInfo() {
    roundElement.textContent = round;
    financeElement.textContent = finance;
    greenElement.textContent = green;
    fossilElement.textContent = fossil;
    elecSumElement.textContent = fossil + green;
    supportElement.textContent = support;
    fossilCountElement.textContent = fossilCount;
}

function nextRound() {
    finance += 5 - fossilCount * fossilFee + mineIncome;
    if(checkLoseCondition()){
        alert("Oops! You've lose the game!");
    }
    if(round >= 10 && checkWinCondition()){
        alert("Congratulations! You've won the game!\nLet's learn something about sustainable energy.");
        window.location.href = "learn.html";
    }
    invokeIncident();
    
    round += 1;
    updateInfo();
}


// 


initGame();


function buildGreen() {
    // 檢查是否還有足夠的財務狀況
    if (finance >= 15) {
        finance -= 15;

        // 檢查目前是第幾回合，調整社會支持度
        if (round <= 4) {
            support -= 10;
        } else {
            support += 20;
        }

        green += greenPower;

    } else {
        alert("財務狀況不足，無法增設綠能設施！");
    }
    nextRound();
}



function buildFossil() {
    if (finance >= 25) {
        finance -= 25;
        fossilCount++; // 增加石化設施數量
        fossil += 300;
        if (round <= 4) {
            support -= 20;
        } else {
            support -= 40;
        }
    } else {
        alert("財務狀況不足，無法增設石化能源設施！");
    }
    nextRound();
}


function removeFossil() {
    if (fossilCount > 0) {
        finance += 10;
        fossilCount--;
        fossil -= 300;
        support += 10;
    } else {
        alert("沒有石化能源設施可以拆除！");
    }
    nextRound();
}

function checkWinCondition() {
    // ... 你的勝利條件判斷邏輯 ...
    if(finance >= 0 && green >= 1700 && green + fossil >= 4000 && support > 0){
        return true;
    }
    else return false;
}

function checkLoseCondition() {
    // ... 你的失敗條件判斷邏輯 ...
    if(finance < -20 || green+fossil < 4000 * 0.7 || support <= 0){
        return true;
    }
    else return false;
}


// 建立事件監聽器
buildGreenButton.addEventListener('click', buildGreen);
buildFossilButton.addEventListener('click', buildFossil);
removeFossilButton.addEventListener('click', removeFossil);

