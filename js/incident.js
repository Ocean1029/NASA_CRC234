// incident.js
import { logMessage } from './gameConsole.js'; // 引入 logMessage , 'incident'函數
import { gameState, updateState } from './gameState.js'; // 引入 gameState 物件和 updateState 函式

// 執行所有事件的調用函式
export function invokeIncident() {
    mineIncident();
    mineDiscover();
    tribeIncident();
    tribeProtest();
    chargeCarbonFee();
    greenRevo();
    oilCrisis();
    carbonCreditExchange();
    airProtest();
    solarProtest();
}

function mineDiscover() {
    if (!gameState.isMineDiscovered && Math.random() <= 0.7) {
        logMessage("Mine discovered! Would you permit license?", 'incident');
        
        swal({
            icon: "info",
            title: "Mine discovered!\nWould you permit license?",
            text: "No license: social support -5.\n\nStrict license: social support +10, finance +3 every year, fuel fee become $0.5/100kW, but 3% possibility there will be a mine incident.\n\nLoose license: social support +10, finance +8 every year, fuel fee become $0.1/100kW, but 30% possibility there will be a mine incident.",
            buttons:{
                Btn: false,
                A: {
                    text: "No",
                    value: 0,
                    visible: true
                },
                B: {
                    text: "Strict License",
                    value: 1,
                    visible: true
                },
                C: {
                    text: "Loose License",
                    value: 2, 
                    visible: true
                }
            }
        }).then((value) => {
            // 發放許可
            updateState({ mineLicense: value });
            if (gameState.mineLicense === 0) {  // no license
                updateState({ support: gameState.support - 5 });
                logMessage("You did not permit any license. Public support decreased by 5.", 'incident');
            }
            if (gameState.mineLicense === 1) {  // strict license
                updateState({ support: gameState.support + 10, mineIncome: 3, fossilFee: 0.5 });
                logMessage("Strict license issued. Public support increased by 10. Fossil fuel fee decreased.", 'incident');
            }
            if (gameState.mineLicense === 2) {  // loose license
                updateState({ support: gameState.support + 10, mineIncome: 8, fossilFee: 0.1 });
                logMessage("Loose license issued. Public support increased by 10. Fossil fuel fee greatly decreased.", 'incident');
            }
            updateState({ isMineDiscovered: true });
        });
    }
}

function mineIncident() {
    if (!gameState.isMineDiscovered || gameState.mineLicense === 0) return;

    if ((gameState.mineLicense === 1 && Math.random() <= 0.03) || (gameState.mineLicense === 2 && Math.random() <= 0.3)) {
        logMessage("Mine Incident Occurred! Public support decreased by 25.", 'incident');
        updateState({ support: gameState.support - 25 });

        if (gameState.mineLicense === 1 || gameState.mineLicense === 2) {
            updateState({ support: gameState.support - 5 });
            logMessage("Public support decreased further by 5 due to the incident.", 'incident');
        }

        if (gameState.mineLicense === 0) {
            updateState({ support: gameState.support + 5, mineIncome: 0, fossilFee: 1 });
            logMessage("Public support increased by 5. Mining operations suspended.", 'incident');
        }
    }
}

function tribeProtest() {
    if (!gameState.isTribeProtest && Math.random() <= 0.3) {
        logMessage("Tribe protest occurred!", 'incident');
        swal({
            icon: "info",
            title: "Tribe residents protesting!\nWhat would you do?",
            text: "Residents concern that their property will be damaged.\n\nContinue installation: support -10.\n\nCommunicate with residents: support +10 but the installation of green energy will be postponed by a round.",
            buttons:{
                Btn: false,
                A: {
                    text: "Continue Installation",
                    value: 1,
                    visible: true
                },
                B: {
                    text: "Communicate",
                    value: 2,
                    visible: true
                }
            }
        }).then((value) => {
            // 發放許可
            updateState({ tribeSelect: value });
            if (gameState.tribeSelect === 1) {
                updateState({ support: gameState.support - 10 });
                logMessage("You did not respond to the tribe's concerns. Public support decreased by 10.", 'incident');
            }
            if (gameState.tribeSelect === 2) {
                updateState({ support: gameState.support + 10, green: gameState.green - gameState.greenPower });
                logMessage("You responded to the tribe's concerns. Public support increased by 10, but green energy output decreased.", 'incident');
            }
            updateState({ isTribeProtest: true });
        });
        
    }
}

function tribeIncident() {
    if (!gameState.isTribeProtest) return;
    if (gameState.tribeSelect === 1 && Math.random() <= 0.3) {
        updateState({ green: gameState.green - gameState.greenPower });
        logMessage("Tribe protest escalated. Green energy output decreased.", 'incident');
    }
    if (gameState.tribeSelect === 2) {
        updateState({ green: gameState.green + gameState.greenPower, tribeSelect: 0 });
        logMessage("Tribe incident resolved. Green energy output restored.", 'incident');
    }
}

function chargeCarbonFee() {
    if (gameState.round === 4) logMessage("[News] To achieve sustainable development goals, carbon fee will be charged in the future.", 'incident');
    if (gameState.round === 6) logMessage("[Info] Carbon fee collection starts now.", 'incident');

    if (gameState.round >= 6) {
        const newCarbonFee = gameState.fossil / 100 * 1;
        updateState({ carbonFee: newCarbonFee, finance: gameState.finance - newCarbonFee });
        logMessage(`Carbon fee charged: $${newCarbonFee}.`, 'incident');
    }
}

function greenRevo() {
    if (gameState.round >= 5 && gameState.greenPower <= 200) {
        updateState({ greenPower: gameState.greenPower * 1.5 });
        logMessage("Green energy revolution occurred! Green energy output increased significantly.", 'incident');
    }
}

function oilCrisis() {
    if (gameState.round >= 8 && gameState.fossilFee === 1 && Math.random() <= 0.5) {
        updateState({ fossilFee: 2, support: gameState.support - 10 });
        logMessage("[News] Oil crisis breakout! Fossil fuel fee increased to $2/300kw.", 'incident');
        logMessage("Public support decreased by 10 due to the crisis.", 'incident');
    }
}

function carbonCreditExchange() {
    if (gameState.round >= 8 && Math.random() <= 0.5) {
        updateState({ isCarbonCreditOpened: true });
        logMessage("[News] Carbon Credit Exchange Opened! Every 100kw excessive green energy could be sold for $10.", 'incident');
    }

    if (gameState.isCarbonCreditOpened) {
        const creditIncome = (gameState.green + gameState.fossil - 4000) * 10 >= 0 ? (gameState.green + gameState.fossil - 4000) * 10 : 0;
        updateState({ finance: gameState.finance + creditIncome });
        logMessage(`Carbon credits sold: $${creditIncome}. Finance increased.`, 'incident');
    }
}

function airProtest() {
    if (gameState.round <= 4 && !gameState.isairProtest && Math.random() <= 0.6) {
        updateState({ support: gameState.support - 15, isairProtest: true });
        logMessage("[News] Residents protest against air pollution! Public support decreases by 15.", 'incident');
    }
}

function solarProtest() {
    if (gameState.round <= 4 && !gameState.issolarProtest && Math.random() <= 0.6) {
        updateState({ support: gameState.support - 15, issolarProtest: true });
        logMessage("[News] Fishing industry raises concerns that solar panels might occupy fishing pond land. Public support decreases by 15.", 'incident');
    }
}
