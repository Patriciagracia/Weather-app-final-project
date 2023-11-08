let apiKey = "e4167474503t4a0o133bbfcc9fa69a38";

function defaultCity() {
  let defaultCity = "Zaragoza";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
defaultCity();

function displayError() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = "City not found";
}

function search(event) {
  event.preventDefault();
  let enterInput = document.querySelector("#cityInput");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${enterInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayCurrentWeather(response) {
  if (response.data.status === "not_found") {
    return displayError();
  }
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperatureUnit");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let iconElement = document.querySelector("#weatherIcon");
  let weatherDescriptionElement = document.querySelector("#weatherDescription");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  celsiusTemperature = response.data.temperature.current;
  getForecast(response.data.city);
}

let celsiusTemperature = null;
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperatureUnit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitBtn = document.querySelector("#farenheitLink");
fahrenheitBtn.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature() {
  let currentTemperature = document.querySelector("#temperatureUnit");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusBtn = document.querySelector("#celsiusLink");
celsiusBtn.addEventListener("click", showCelsiusTemperature);

function currentDayAndTime() {
  let currentDateElement = document.querySelector("#currentDate");
  let dayHour = new Date();
  let hours = dayHour.getHours().toString().padStart(2, "0");
  let minutes = dayHour.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayHour.getDay()];
  currentDateElement.innerHTML = `${day} ${hours}:${minutes} h`;
}
currentDayAndTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class = "weather-forecast-day">
        <div class = "weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class = "weather-forecast-max-temperature"><strong> ${Math.round(
          day.temperature.maximum
        )}º</strong> <span class = "weather-forecast-min-temperature">${Math.round(
          day.temperature.minimum
        )}º</span></div> 
      </div>
`;
    }
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
