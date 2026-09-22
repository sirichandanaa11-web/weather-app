const apiKey = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    // Check if city is empty
    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    // Show loading message
    result.innerHTML = "Loading...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        // Check API response
        if (!response.ok) {
            result.innerHTML = `Error: ${data.message}`;
            return;
        }

        // Display weather
        result.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡️ Temperature: ${data.main.temp}°C</p>
            <p>🌤️ Condition: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {
        result.innerHTML = "Unable to connect to the weather service.";
        console.error(error);
    }
});
