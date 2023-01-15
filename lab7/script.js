const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");

const apiKey = "7ed801ab1538fc4324b7440c5c303204";

let currentCityData;
let currentWeatherData;


class City {

  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

getCities().forEach((city) => {
  fetchCityData(city.name);
});

function getCities() {
  return JSON.parse(localStorage.getItem("cities") || "[]");
}

function saveCities(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

searchButton.addEventListener("click", function () {
  findCity();
});

function addCity(cityName) {
  let cityObject = new City (Math.floor(Math.random() * 100000), cityName);

  const cities = getCities();

  cities.push(cityObject);
  saveCities(cities);
}

function findCity() {
  const cityName = searchInput.value;
  addCity(cityName);

  fetchCityData(cityName);
}

function fetchCityData(cityName) {
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

  itemElement.setAttribute('class', 'list-element')

  weatherElementHeader.appendChild(weatherElementHeaderDate);
  weatherElementHeader.appendChild(weatherElementHeaderName);
  itemElement.appendChild(weatherElementHeader);

  weatherElementDataTemperature.setAttribute('class', 'current-temp')

  weatherElementDataTemperatureIcon.setAttribute('class', "icon");
  weatherElementDataTemperatureIcon.setAttribute('src', getCurrentWeatherIcon());

  weatherElementDataTemperatureValue.setAttribute('class', 'temp-value');
  weatherElementDataTemperatureValue.innerHTML = Math.round(currentWeatherData.main.temp) + "&deg;C"

  weatherElementDataDescription.setAttribute('class', 'temp-description')
  weatherElementDataDescription.innerHTML = "Feels like " + Math.round(currentWeatherData.main.feels_like) + "&deg;C , " + currentWeatherData.weather[0].description
    + "<br> Humidity: " + currentWeatherData.main.humidity + " % , <br> Pressure: " + currentWeatherData.main.pressure + "hPa";

  weatherElementDataTemperature.appendChild(weatherElementDataTemperatureIcon);
  weatherElementDataTemperature.appendChild(weatherElementDataTemperatureValue);

  weatherElementData.appendChild(weatherElementDataTemperature);
  weatherElementData.appendChild(weatherElementDataDescription);
  itemElement.appendChild(weatherElementData);

  searchResult.appendChild(itemElement);
}

function getCurrentWeatherIcon() {
  return "http://openweathermap.org/img/wn/" + currentWeatherData.weather[0].icon + "@2x.png";
}

