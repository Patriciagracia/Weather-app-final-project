let apiKey = "e4167474503t4a0o133bbfcc9fa69a38";

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

function currentWeatherIcon(response) {
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

axios.get(apiUrl).then(currentWeatherIcon);
