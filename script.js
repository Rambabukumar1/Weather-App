const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const Weather_img = document.querySelector('.Weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.Weather-body');

async function checkWeather(city) {
    const api_key = "b3924df3d443f5f7da539a5f9e07df2c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    
    // Ensure temperature data exists
    if (weather_data.main && weather_data.main.temp) {
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    }

    // Ensure weather description exists
    if (weather_data.weather && weather_data.weather[0]) {
        description.innerHTML = `${weather_data.weather[0].description}`;
    }

    // Ensure humidity data exists
    if (weather_data.main && weather_data.main.humidity) {
        humidity.innerHTML = `${weather_data.main.humidity}%`;
    }

    // Ensure wind speed data exists
    if (weather_data.wind && weather_data.wind.speed) {
        windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;
    }

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            Weather_img.src = "/pic/Cloud.png";
            break;
        case 'Clear':
            Weather_img.src = "/pic/Clear.png";
            break;
        case 'Rain':
            Weather_img.src = "/pic/Rain.png";
            break;
        case 'Mist':
            Weather_img.src = "/pic/Mist.png";
            break;
        case 'Snow':
            Weather_img.src = "/pic/Snow.png";
            break;
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
