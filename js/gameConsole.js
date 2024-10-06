// 取得遊戲控制台的 DOM 元素
const consoleLog = document.getElementById('console-log');

// 自訂函式來將訊息顯示到控制台
function logMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    consoleLog.appendChild(messageElement);

    // 自動捲動到控制台底部，以便顯示最新訊息
    consoleLog.scrollTop = consoleLog.scrollHeight;
}

// 將 logMessage 函數匯出，以便在其他檔案（如 main.js）中使用
export { logMessage };
