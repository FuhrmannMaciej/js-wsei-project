const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");

const apiKey = "7ed801ab1538fc4324b7440c5c303204";

let currentCityData;
let currentWeatherData;

searchButton.addEventListener("click", function () {
  findCity();
});

function findCity() {
  const cityName = searchInput.value;
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      currentCityData = data;
      console.log(currentCityData);
      searchResult.innerHTML = "";
      getCurrentWeatherData();
    })
    .catch(error => {
      console.error("Error:", error);
      searchResult.innerHTML = "An error occurred. Please try again later.";
    })
}
function getCurrentWeatherData() {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + currentCityData[0].lat + "&lon=" + currentCityData[0].lon + "&units=metric" + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      currentWeatherData = data;
      console.log(currentWeatherData);
      displayWeatherData();
    });
}

function displayWeatherData() {
  const itemElement = document.createElement("li");
  const weatherElementHeader = document.createElement('div');
  const weatherElementHeaderDate = document.createElement('span');
  const weatherElementHeaderName = document.createElement('h2');

  const weatherElementData = document.createElement('div');
  const weatherElementDataTemperature = document.createElement('div');
  const weatherElementDataTemperatureIcon = document.createElement('img');
  const weatherElementDataTemperatureValue = document.createElement('span');

  const weatherElementDataDescription = document.createElement('div');

  const today = new Date(Date.now()).toUTCString();
  weatherElementHeaderDate.innerHTML = today;
  weatherElementHeaderName.innerHTML = currentCityData[0].name + ", " + currentCityData[0].country;

  weatherElementHeader.appendChild(weatherElementHeaderDate);
  weatherElementHeader.appendChild(weatherElementHeaderName);
  itemElement.appendChild(weatherElementHeader);

  weatherElementDataTemperatureIcon.setAttribute('class', "icon");
  weatherElementDataTemperatureIcon.setAttribute('src', getCurrentWeatherIcon());

  weatherElementDataTemperatureValue.innerHTML = currentWeatherData.main.temp + "&deg;C"

  weatherElementDataTemperature.appendChild(weatherElementDataTemperatureIcon);
  weatherElementDataTemperature.appendChild(weatherElementDataTemperatureValue);

  weatherElementData.appendChild(weatherElementDataTemperature);
  weatherElementData.appendChild(weatherElementDataDescription);
  itemElement.appendChild(weatherElementData);

  searchResult.appendChild(itemElement);
}

function getCurrentWeatherIcon () {
  return "http://openweathermap.org/img/wn/" + currentWeatherData.weather[0].icon + "@2x.png";
}

