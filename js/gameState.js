// gameState.js

// 遊戲狀態物件
export const gameState = {
    round: 1,
    finance: 100,
    fossil: 3900,
    green: 100,
    support: 100,
    fossilCount: 13,
    mineIncome: 0,
    greenPower: 200,
    fossilFee: 1,
    isCarbonCreditOpened: false,
    isairProtest: false,
    issolarProtest: false,
    isMineDiscovered: false,
    isTribeProtest: false,
    mineLicense: 0,
    carbonFee: 0,
    tribeSelect: 0,
};

// 更新遊戲狀態的函式
export function updateState(newState) {
    Object.assign(gameState, newState);
}
