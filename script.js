const apiKey = "4cff9099bf117346138926c00994ac2d";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {

    const city = cityInput.value.trim();

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            result.innerHTML = "City not found";
            return;
        }

        result.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {
        result.innerHTML = "Something went wrong";
    }
});
