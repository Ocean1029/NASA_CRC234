// gameUI.js
import { gameState } from './gameState.js';

// 取得 DOM 元素
const roundElement = document.getElementById('round');
const financeElement = document.getElementById('finance');
const greenElement = document.getElementById('green');
const fossilElement = document.getElementById('fossil');
const elecSumElement = document.getElementById('elec-sum');
const supportElement = document.getElementById('support');
const fossilCountElement = document.getElementById('fossil-count');

// 更新 UI 資訊的函式
export function updateInfo() {
    roundElement.textContent = gameState.round;
    financeElement.textContent = gameState.finance;
    greenElement.textContent = gameState.green;
    fossilElement.textContent = gameState.fossil;
    elecSumElement.textContent = gameState.fossil + gameState.green;
    supportElement.textContent = `${gameState.support}%`;
    fossilCountElement.textContent = gameState.fossilCount;
}
