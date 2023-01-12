const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");

const apiKey = "7ed801ab1538fc4324b7440c5c303204";

let cityLat;
let cityLon;

searchButton.addEventListener("click", function () {
  findCity();
});

function findCity() {
  const cityName = searchInput.value;
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      searchResult.innerHTML = "";
      cityLat = data[0].lat;
      cityLon = data[0].lon;
      const itemElement = document.createElement("li");
      itemElement.innerHTML = data[0].name;
      searchResult.appendChild(itemElement);
      console.log(cityLat);
      getCurrentWeatherData();
    })
    .catch(error => {
      console.error("Error:", error);
      searchResult.innerHTML = "An error occurred. Please try again later.";
    })
}
function getCurrentWeatherData() {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=metric" + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

