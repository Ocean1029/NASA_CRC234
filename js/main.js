// main.js
import { logMessage } from './gameConsole.js';
import { buildGreen, buildFossil, removeFossil } from './gameActions.js';
import { updateInfo } from './gameUI.js';
import { gameState, updateState } from './gameState.js';
import { getSolarEnergyOutput } from './getSolarEnergyOutput.js';

// 初始化遊戲
function initGame() {

    let solar_data = -1
    getSolarEnergyOutput(121.5, 25.0, 19900101, 20221231).then(data => {
        console.log("Solar Radiation Data:", data);  // Display the results in the console
        updateState({
            solar_data: data
        });
    })
        .catch(error => {
            console.error("Error:", error);  // Display any error messages
        });


    updateState({
        round: 1,
        finance: 100,
        fossil: 3900,
        green: 100,
        support: 100,
        fossilCount: 13,
        greenPower: 200,
        fossilFee: 1,
        mineIncome: 0,
        isCarbonCreditOpened: false,
        isairProtest: false,
        issolarProtest: false,
        isMineDiscovered: false,
        isTribeProtest: false,
        isIncidentHappend: false,
        mineLicense: 0,
        carbonFee: 0,
        tribeSelect: 0,
        solar_data: solar_data
    });
    updateInfo();
    logMessage("Welcome to the Green Energy Policy Simulation Game!", 'success');



}

// 啟動遊戲
initGame();

// 事件監聽器綁定
const buildGreenButton = document.getElementById('build-green');
const buildFossilButton = document.getElementById('build-fossil');
const removeFossilButton = document.getElementById('remove-fossil');

buildGreenButton.addEventListener('click', buildGreen);
buildFossilButton.addEventListener('click', buildFossil);
removeFossilButton.addEventListener('click', removeFossil);
