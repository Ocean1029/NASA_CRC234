// gameUI.js
import { gameState } from './gameState.js';

// 取得 DOM 元素
const roundElement = document.getElementById('round');
const financeElement = document.getElementById('finance');
const greenElement = document.getElementById('green_installed_capacity');
const fossilElement = document.getElementById('fossil_installed_capacity');
const greenProductionElement = document.getElementById('green_electricity_production');
const fossilProductionElement = document.getElementById('fossil_electricity_production');
const elecSumElement = document.getElementById('elec-sum');
const supportElement = document.getElementById('support');
const fossilCountElement = document.getElementById('fossil-count');


// 更新 UI 資訊的函式
export function updateInfo() {
    roundElement.textContent = gameState.round;
    financeElement.textContent = gameState.finance.toLocaleString();
    greenElement.textContent = gameState.green_installed_capacity.toLocaleString();
    fossilElement.textContent = gameState.fossil_installed_capacity.toLocaleString();
    greenProductionElement.textContent = Math.round((gameState.green_installed_capacity / 0.2 * gameState.randomValue) / 1000).toLocaleString();
    fossilProductionElement.textContent = Math.round((gameState.fossil_installed_capacity * 8760 * 0.9) / 1000).toLocaleString();
    elecSumElement.textContent = Math.round((gameState.green_installed_capacity / 0.2 * gameState.randomValue + gameState.fossil_installed_capacity * 8760 * 0.9) / 1000).toLocaleString();
    supportElement.textContent = `${gameState.support.toLocaleString()}%`;
    fossilCountElement.textContent = gameState.fossilCount.toLocaleString();
}
