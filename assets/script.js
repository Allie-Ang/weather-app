const apiKey = "26b7283df774d23ad23929f9b2ab0395";

// reach into the html and grab the button you want to listen to
var enterBtn = document.querySelector("#btn");
console.dir(enterBtn);
const cityNameIn = document.querySelector("#cityName");

function handleCitySearch(event) {
  event.preventDefault();
  var city = cityNameIn.value.trim();
  console.log(city);
  // call a new fx for fetching. pass it the city
  fetchCurrentWeather(city);
  cityNameIn.value = "";

  localStorage.setItem("searchedCity", JSON.stringify(city));
  var searchedCity = document.createElement("p");
  searchedCity.textContent = "Hisory: ";
  card.append(searchedCity);
  document.querySelector("userHistory").append(card);
  console.log(city);
}

enterBtn.addEventListener("click", handleCitySearch);

function fetchCurrentWeather(city) {
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

  fetch(apiUrlWeather)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data);
      fetch5Day(data.coord.lat, data.coord.lon);
    });
}

function displayCurrentWeather(data) {
  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let icon = document.createElement("img");
  icon.setAttribute("src", iconUrl);
  document.querySelector(".card-header").append(icon);
  document.querySelector("#tempurature").textContent =
    "Tempurature: " + data.main.temp;
  document.querySelector("#wind").textContent =
    "Wind Speed: " + data.wind.speed;
  document.querySelector("#humidity").textContent =
    "Humidity: " + data.main.humidity;
}

function fetch5Day(lat, lon) {
  var apiUrl5Day = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl5Day)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      display5Day(data);
    });
}

function display5Day(fiveDayData) {
  for (let i = 3; i < fiveDayData.list.length; i += 8) {
    let card = document.createElement("div");
    card.classList.add("col-md-2", "forecast", "text-white", "m-2", "rounded");

    let dateEl = document.createElement("p");
    dateEl.textContent = dayjs
      .unix(fiveDayData.list[i].dt)
      .format("MM/DD/YYYY");

    let tempEL = document.createElement("p");
    tempEL.textContent = "Tempurature: " + fiveDayData.list[i].main.temp;

    let windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + fiveDayData.list[i].wind.speed;

    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + fiveDayData.list[i].main.humidity;

    card.append(dateEl, tempEL, humidity, windSpeed);

    document.querySelector("#forecast").append(card);
  }
}
