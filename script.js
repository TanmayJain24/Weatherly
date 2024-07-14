const inputBox =  document.querySelector('.input-box');
const searchBtn =  document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const detect_location = document.getElementById('detectLocation');

async function checkWeather(city){
    const api_key = "520550147168f10c504848a864d66963";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const weather_data = await fetch(`${url}`).then(response => response.json());
        console.log(weather_data);

        if(weather_data.cod == '404'){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }
        
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${weather_data.main.temp}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(2)} km/hr`;

        switch(weather_data.weather[0].main){
            case 'Clouds':
                weather_img.src = "/images/cloud.png";
                break;
            case 'Mist':
                weather_img.src = "/images/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/images/snow.png";
                break;           
            case 'Clear':
                weather_img.src = "/images/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/images/rain.png";
                break;
        }
    }catch{
        console.error('Error fetching weather data:', error);
    }
}

async function detectLocation(lat, lon) {
    const api_key = "520550147168f10c504848a864d66963";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        console.log(weatherData);

        if (weatherData.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        inputBox.value = weatherData.name;
        temperature.innerHTML = `${weatherData.main.temp}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        wind_speed.innerHTML = `${(weatherData.wind.speed * 3.6).toFixed(2)} km/hr`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/images/cloud.png";
                break;
            case 'Mist':
                weather_img.src = "/images/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/images/snow.png";
                break;
            case 'Clear':
                weather_img.src = "/images/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/images/rain.png";
                break;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function handleSearch() {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        console.error('City name is empty');
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

detect_location.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                detectLocation(latitude, longitude);
            },
            (error) => {
                console.error('Error detecting location:', error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
