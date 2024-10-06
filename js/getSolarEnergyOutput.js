/**
 * 輸入指定點位與時間範圍，回傳時間範圍內，每平方公尺的太陽能板總共可以發多少電
 * （單位：kwh/m²）。
 * @param {number} longitude - The longitude of the location (e.g., 121.5).
 * @param {number} latitude - The latitude of the location (e.g., 25.0).
 * @param {string} startDate - Start date in the format YYYYMMDD (e.g., "20230101").
 * @param {string} endDate - End date in the format YYYYMMDD (e.g., "20230131").
 * @returns {Promise<object>} - Returns a Promise containing daily solar radiation data.
 */

async function getSolarEnergyOutput(longitude, latitude, startDate, endDate) {
    // Define the base URL for NASA POWER API
    const baseUrl = "https://power.larc.nasa.gov/api/temporal/daily/point";

    const fetch = require("node-fetch"); // 如果可以直接fetch就刪除這行

    // Set up query parameters
    const params = new URLSearchParams({
        parameters: "ALLSKY_SFC_SW_DWN",  // All-sky surface shortwave downward radiation ((kWh)/(m²day))
        community: "RE",                  // Use the Renewable Energy community
        longitude: longitude,             // Longitude of the location
        latitude: latitude,               // Latitude of the location
        start: startDate,                 // Start date in the format YYYYMMDD
        end: endDate,                     // End date in the format YYYYMMDD
        format: "JSON"                    // Response format (JSON)
    });

    // Construct the complete API URL
    const apiUrl = `${baseUrl}?${params.toString()}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const solarRadiation = data.properties.parameter.ALLSKY_SFC_SW_DWN;

        // const results = Object.entries(solarRadiation).map(([date, value]) => ({
        //     date,
        //     radiation: value
        // }));


        const efficiency = 0.2

        let totalEnergyOutputPerM2 = 0; // 總發電量（kWh）
        for (const value of Object.values(solarRadiation)) {
            const dailyEnergyOutput = value * efficiency; // 每日發電量
            totalEnergyOutputPerM2 += dailyEnergyOutput; // 累加到總發電量
        }
        return totalEnergyOutputPerM2;

    } catch (error) {
        console.error("Failed to retrieve data:", error);
        throw error;
    }
}

// // Example usage
// const longitude = 121.5;
// const latitude = 25.0;
// const startDate = "20230101";  // Start date in the format YYYYMMDD
// const endDate = "20230131";    // End date in the format YYYYMMDD

// // Call the function and display the results
// getSolarEnergyOutput(longitude, latitude, startDate, endDate)
//     .then(data => {
//         console.log("Solar Radiation Data:", data);  // Display the results in the console
//     })
//     .catch(error => {
//         console.error("Error:", error);  // Display any error messages
//     });