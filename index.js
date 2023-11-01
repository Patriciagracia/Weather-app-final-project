let apiKey = "e4167474503t4a0o133bbfcc9fa69a38";

function defaultCity() {
  let defaultCity = "Zaragoza";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
defaultCity();

function search(event) {
  event.preventDefault();
  let enterInput = document.querySelector("#cityInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = enterInput.value;
  let query = enterInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayCurrentWeather(response) {
  let temperatureElement = document.querySelector("#temperatureUnit");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  celsiusTemperature = response.data.temperature.current;
}

let celsiusTemperature = null;
function showFarenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperatureUnit");
  console.log(celsiusTemperature);
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(farenheitTemperature);
}

let farenheitBtn = document.querySelector("#farenheitLink");
farenheitBtn.addEventListener("click", showFarenheitTemperature);

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
