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

// 解釋規則
export function ruleExplain() {
    swal({
        title: "How to Play?",
        icon: "info",
        text: "\
1. Start: You begin with a $100, a mix of fossil fuel and green energy production, and a neutral social support point.\n\
2. Choose Actions: In each round, you would have $5 of tax income, and you can choose one of three actions:\n\
    - Build Green Energy Facility: +200kW of green energy capacity, -$15 of finance.\n\
    - Build Fossil Energy Facility: +300kW of green energy capacity, -$25 of finance, and causing harm to social support\n\
    - Remove Fossil Energy Facility: -300kW of green energy capacity, +$10 of finance, and gain social support.\n\
3. Incidents: Beware of the news! there might be factors that relevent to the game.\n\
4. Electricity Capacity: Beware that this is different from actual electricity production.",
        buttons: true,
        className: "swal-custom-class" 
    });
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
