// gameActions.js
import { logMessage } from './gameConsole.js';
import { invokeIncident } from './incident.js';
import { gameState, updateState } from './gameState.js';
import { updateInfo } from './gameUI.js';

// 建立綠能設施
export function buildGreen() {
    if (gameState.finance >= 15) {
        updateState({
            finance: gameState.finance - 15,
            support: gameState.round <= 4 ? gameState.support - 10 : gameState.support + 20,
            green_installed_capacity: gameState.green_installed_capacity + gameState.greenPower,
        });
        logMessage(`Built a green energy facility. Green Energy Output is now ${gameState.green_installed_capacity} kW.`);
    } else {
        logMessage("Insufficient funds to build a green energy facility!");
    }
    nextRound();
}

// 建立石化設施
export function buildFossil() {
    if (gameState.finance >= 25) {
        updateState({
            finance: gameState.finance - 25,
            fossilCount: gameState.fossilCount + 1,
            fossil_installed_capacity: gameState.fossil_installed_capacity + 300,
            support: gameState.round <= 4 ? gameState.support - 20 : gameState.support - 40,
        });
        logMessage(`Built a fossil energy facility. Fossil Energy Output is now ${gameState.fossil_installed_capacity} kW. Fossil facilities: ${gameState.fossilCount}.`);
    } else {
        logMessage("Insufficient funds to build a fossil energy facility!", 'loss');
    }
    nextRound();
}

// 拆除石化設施
export function removeFossil() {
    if (gameState.fossilCount > 0) {
        updateState({
            finance: gameState.finance + 10,
            fossilCount: gameState.fossilCount - 1,
            fossil: gameState.fossil - 300,
            support: gameState.support + 10,
        });
        logMessage(`Removed a fossil energy facility. Fossil Energy Output is now ${gameState.fossil} kW. Fossil facilities: ${gameState.fossilCount}.`);
    } else {
        logMessage("No fossil energy facilities left to remove!", 'loss');
    }
    nextRound();
}

// 下一回合的操作
function nextRound() {
    const newFinance = gameState.finance + 5 - gameState.fossilCount * gameState.fossilFee + gameState.mineIncome;

    let newRandomValue = 25 + (10 * Math.random())

    if (gameState.solar_data != -1) {
        newRandomValue = gameState.solar_data[Math.floor(Math.random() * gameState.solar_data.length)]
        newRandomValue = Math.round(newRandomValue)
    }

    console.log(gameState.solar_data)

    updateState({
        finance: newFinance,
        round: gameState.round + 1,
        randomValue: newRandomValue,
    });
    updateInfo();
    if (checkLoseCondition()) {
        logMessage("Oops! You've lost the game! Better luck next time.", 'loss');
    } else if (checkWinCondition()) {
        logMessage("Congratulations! You've won the game! Let's learn something about sustainable energy.", 'success');
        window.location.href = "learn.html";
    } else {
        updateState({ isIncidentHappend: false });
        invokeIncident();
        logMessage(`Starting round ${gameState.round}. Finance is now $${gameState.finance}.`, 'success');
        updateInfo();
    }
}

// 檢查勝利條件
function checkWinCondition() {
    return gameState.finance >= 0 && gameState.green_electricity_production >= 1700 && (gameState.green_electricity_production + gameState.fossil_electricity_production) >= 4000 && gameState.support > 0;
}

// 檢查失敗條件
function checkLoseCondition() {
    return gameState.finance < -20 || (gameState.green_electricity_production + gameState.fossil_electricity_production) < 4000 * 0.7 || gameState.support <= 0;
}
