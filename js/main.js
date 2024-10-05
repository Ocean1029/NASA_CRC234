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
let fossilCost = 0;
let fossilCount = 13; // 追蹤石化設施數量


function updateInfo() {
    roundElement.textContent = round;
    financeElement.textContent = finance;
    greenElement.textContent = green;
    fossilElement.textContent = fossil;
    elecSumElement.textContent = fossil + green;
    supportElement.textContent = support;
    fossilCountElement.textContent = fossilCount;
}
updateInfo();

function nextRound() {
    round += 1;
    finance += 5 - fossilCount * 1;
    updateInfo();
}


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

        green += 200;

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
}

function checkLoseCondition() {
    // ... 你的失敗條件判斷邏輯 ...
}


// 建立事件監聽器
buildGreenButton.addEventListener('click', buildGreen);
buildFossilButton.addEventListener('click', buildFossil);
removeFossilButton.addEventListener('click', removeFossil);

