// 初始化地圖，聚焦於台灣
const map = L.map('map').setView([23.9978, 120.9605], 8); // 台灣的經緯度中心和適當的縮放級別

// 添加地圖圖層（使用 OpenStreetMap）
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    // L.tileLayer 是 Leaflet 提供的一個方法，用來添加地圖圖層, {z}/{x}/{y} 是地圖瓦片的路徑
    attribution: '&copy; OpenStreetMap contributors'
    // attribution 是地圖資料的來源，這裡是 OpenStreetMap
}).addTo(map);


// 定義樣式
const regionStyle = {
    color: "#3388ff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.2
};

// 載入 GeoJSON 資料
fetch('../data/regions.geojson')

    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: regionStyle,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => {
        console.error('載入 GeoJSON 資料失敗:', error);
    });

// 定義每個區域的互動行為
function onEachFeature(feature, layer) {
    // 添加滑鼠懸停提示
    layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "top"
    });

    // 添加點擊事件
    layer.on({
        click: onRegionClick
    });
}

// 點擊區域時觸發的函數
function onRegionClick(e) {
    const regionName = e.target.feature.properties.name;
    console.log(`選擇的區域：${regionName}`);
    displayTemperatureData(regionName);
}
