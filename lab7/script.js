const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");

const apiKey = "7ed801ab1538fc4324b7440c5c303204";

searchButton.addEventListener("click", function () {
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.value + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      searchResult.innerHTML = "";
      data.forEach(item => {
        if (item.name.toLowerCase() === searchInput.value.toLowerCase()) {
          const itemElement = document.createElement("li");
          itemElement.innerHTML = item.name;
          searchResult.appendChild(itemElement);
        }
      });
    })
    .catch(error => {
      console.error("Error:", error);
      searchResult.innerHTML = "An error occurred. Please try again later.";
    })
  });
