let apiKey = "e4167474503t4a0o133bbfcc9fa69a38";

function displayCurrentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
}

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather);

function currentWeatherIcon(response) {
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

axios.get(apiUrl).then(currentWeatherIcon);
