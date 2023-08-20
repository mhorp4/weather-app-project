//Day and Time configuration
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[currentDate.getDay()];
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = document.querySelector("#date");
date.innerHTML = `${weekDay} ${hours}:${minutes}`;
// Search engine and the City Name display

function showCurrentWeather(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = currentTemperature;
  let currentHumidity = response.data.main.humidity;
  let humidityValue = document.querySelector("#hum-value");
  humidityValue.innerHTML = currentHumidity;
  let currentWindSpeed = response.data.wind.speed;
  let windSpeedValue = document.querySelector("#windspeed-value");
  windSpeedValue.innerHTML = currentWindSpeed;
  let currentSkyCondition = response.data.weather[0].description;
  let skyValue = document.querySelector("#sky");
  skyValue.innerHTML = currentSkyCondition;
  let mainIcon = document.querySelector("#main_icon");
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let searchedCity = document.querySelector("#city-name");
  searchedCity.innerHTML = cityInput.value;
  let apiKey = "0cf470916ff6ab4caeb35ee055c59b77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showWeatherGeolocation() {
  function handlePosition(position) {
    function retrieveCurrentLocationWeather(response) {
      console.log(response);
      let geolocationCity = response.data.name;
      let searchedCity = document.querySelector("#city-name");
      searchedCity.innerHTML = geolocationCity;
      let currentTemperature = Math.round(response.data.main.temp);
      let tempValue = document.querySelector("#temp-value");
      tempValue.innerHTML = currentTemperature;
      let currentHumidity = response.data.main.humidity;
      let humidityValue = document.querySelector("#hum-value");
      humidityValue.innerHTML = currentHumidity;
      let currentWindSpeed = response.data.wind.speed;
      let windSpeedValue = document.querySelector("#windspeed-value");
      windSpeedValue.innerHTML = currentWindSpeed;
      let currentSkyCondition = response.data.weather[0].description;
      let skyValue = document.querySelector("#sky");
      skyValue.innerHTML = currentSkyCondition;
      let mainIcon = document.querySelector("#main_icon");
      mainIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      mainIcon.setAttribute("alt", response.data.weather[0].description);
    }
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "0cf470916ff6ab4caeb35ee055c59b77";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(retrieveCurrentLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showWeatherGeolocation);

// C/F convertor
