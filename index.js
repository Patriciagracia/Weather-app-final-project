function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}
let apiKey = "e4167474503t4a0o133bbfcc9fa69a38";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
