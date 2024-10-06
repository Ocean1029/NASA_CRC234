/**
 * 輸入指定點位與時間範圍，回傳時間範圍內，每平方公尺的太陽能板總共可以發多少電
 * （單位：kwh/m²）。
 * @param {number} longitude - The longitude of the location (e.g., 121.5).
 * @param {number} latitude - The latitude of the location (e.g., 25.0).
 * @param {string} startDate - Start date in the format YYYYMMDD (e.g., "20230101").
 * @param {string} endDate - End date in the format YYYYMMDD (e.g., "20230131").
 * @returns {Promise<object>} - Returns a Promise containing daily solar radiation data.
 */

export async function getSolarEnergyOutput(longitude, latitude, startDate, endDate) {
    // Define the base URL for NASA POWER API
    const baseUrl = "https://power.larc.nasa.gov/api/temporal/daily/point";

    // const fetch = require("node-fetch"); // 如果可以直接fetch就刪除這行

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

        const efficiency = 0.2

        const results = Object.entries(solarRadiation).map(([date, value]) => ({
            date,
            radiation: value,
            energy: value * efficiency
        }));

        const yearlySum = results.reduce((acc, obj) => {
            const year = obj.date.substring(0, 4); // 取出年份（前四個字元）
            acc[year] = (acc[year] || 0) + obj.energy; // 將相同年份的輻射量累加
            return acc;
        }, {});

        const energySumArray = Object.values(yearlySum);

        return energySumArray;

    } catch (error) {
        console.error("Failed to retrieve data:", error);
        throw error;
    }
}

// // Example usage
// const longitude = 121.5;
// const latitude = 25.0;
// const startDate = "2000";  // Start date in the format YYYY
// const endDate = "2022";    // End date in the format YYYY

// // Call the function and display the results
// getSolarEnergyOutput(longitude, latitude, startDate, endDate)
//     .then(data => {
//         console.log("Solar Radiation Data:", data);  // Display the results in the console
//     })
//     .catch(error => {
//         console.error("Error:", error);  // Display any error messages
//     });