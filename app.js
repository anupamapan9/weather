// catch the containers
const cityName = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherImg = document.querySelector("#weatherImg");
const form = document.querySelector("#form");
const cityNameSearch = document.querySelector("#cityName");
const myApi = "3cfe5d3e18f0d81a45499a08bee28cff";

// first time weather update for visitor ----------------
async function getWeather(url) {
  try {
    const res = await fetch(url);
    const weather = await res.json();
    showWeather(weather);
  } catch (error) {
    console.log(error);
  }
}

// user search
function userSearch(e) {
  e.preventDefault();
  const userCityName = cityNameSearch.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${myApi}`;
  getWeather(url);
}
form.onsubmit = userSearch;
// show weather to the dom----------------
function showWeather(weather) {
  if (weather.cod >= 400) {
    cityName.innerText = "city not found";
    temperature.innerText = "";
    humidity.innerText = "";
    wind.innerText = "";
    weatherImg.src = "./images/fail.png";
  } else {
    cityName.innerText = weather.name;
    const tem = Math.floor(weather.main.temp - 273);
    temperature.innerText = tem + " °C";
    humidity.innerText = weather.main.humidity;
    wind.innerText = weather.wind.speed;
    const sky = weather.weather[0].main.toLowerCase();

    if (sky == "clear") {
      weatherImg.src = "./images/clear.png";
    } else if (sky == "clouds") {
      weatherImg.src = "./images/clouds.png";
    } else if (sky == "drizzle") {
      weatherImg.src = "./images/drizzle.png";
    } else if (sky == "mist") {
      weatherImg.src = "./images/mist.png";
    } else if (sky == "rain") {
      weatherImg.src = "./images/rain.png";
    } else if (sky == "snow") {
      weatherImg.src = "./images/snow.png";
    } else {
      weatherImg.src = "./images/clear.png";
    }
  }
}
