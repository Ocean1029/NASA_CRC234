// gameConsole.js

// 取得遊戲控制台的 DOM 元素
const consoleLog = document.getElementById('console-log');

// 自訂函式來將訊息顯示到控制台
export function logMessage(message, type = 'info') {
    const messageElement = document.createElement('p');
    
    // 根據訊息類型添加對應的 CSS 類別
    switch (type) {
        case 'info':
            messageElement.classList.add('log-info');
            break;
        case 'warning':
            messageElement.classList.add('log-warning');
            break;
        case 'loss':
            messageElement.classList.add('log-loss');
            break;
        case 'success':
            messageElement.classList.add('log-success');
            break;
        case 'incident':
            messageElement.classList.add('log-incident');
        default:
            messageElement.classList.add('log-info');
            break;
    }
    
    // 取得當前時間作為時間戳
    const timestamp = new Date().toLocaleTimeString();
    
    // 設置訊息的內容，包括時間戳和訊息本身
    messageElement.textContent = `[${timestamp}] ${message}`;
    consoleLog.appendChild(messageElement);

    // 自動捲動到控制台底部，以便顯示最新訊息
    consoleLog.scrollTop = consoleLog.scrollHeight;
}
