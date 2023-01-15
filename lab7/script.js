const searchBlock = document.querySelector("#search-block");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");
const errorElement = document.querySelector("#error-element");

const apiKey = "7ed801ab1538fc4324b7440c5c303204";

class City {

  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

getCities().forEach((city) => {
  fetchCityData(city.id ,city.name);
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
  let cityObject = new City(Math.floor(Math.random() * 100000), cityName);

  const cities = getCities();

  if (cities.length === 10) {
    displayErrorMessage("No more than 10 weather data results can be added. Please delete one first");
    return;
  }

  cities.push(cityObject);
  saveCities(cities);
  fetchCityData(cityObject.id , cityName);
}

function findCity() {
  const cityName = searchInput.value;
  addCity(cityName);
}

async function fetchCityData(id ,cityName) {
  try {
    errorElement.innerHTML = "";
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey);
    const data = await response.json();
    console.log(data);
    await getCurrentWeatherData(id ,data);
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage("An error occurred. Please enter correct city name.");
  }
}

function displayErrorMessage(errorMessage) {
  errorElement.innerHTML = errorMessage;
}

async function getCurrentWeatherData(id, currentCityData) {
  try {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + currentCityData[0].lat + "&lon=" + currentCityData[0].lon + "&units=metric" + "&appid=" + apiKey);
    const data = await response.json();
    console.log(data);
    await displayWeatherData(id ,data, currentCityData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayWeatherData(id, currentWeatherData, currentCityData) {
  const itemElement = document.createElement("li");

  itemElement.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this weather data?"
    );

    if (doDelete) {
      deleteCity(id, itemElement);
    }
  });


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
  weatherElementDataTemperatureIcon.setAttribute('src', getCurrentWeatherIcon(currentWeatherData));

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

function getCurrentWeatherIcon(currentWeatherData) {
  return "http://openweathermap.org/img/wn/" + currentWeatherData.weather[0].icon + "@2x.png";
}

function deleteCity(id, element) {
  const cities = getCities().filter((city) => city.id != id);

  saveCities(cities);
  searchResult.removeChild(element);
}

