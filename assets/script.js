// Weather API
// Geocoding API

// Assigning API key to variable
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
}

// add the event listener tool
enterBtn.addEventListener("click", handleCitySearch);
// ** get the value the user enter
// reach into the html and grab the text box
// sanity check - look at it to see what prop hold the value
// extract that data

// ** use that data to make a call to the api
// try to make the call w/ static data first
// once that works use the data you got form the user
function fetchCurrentWeather(city) {
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

  fetch(apiUrlWeather)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      // all the coding that is based on data
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
  document.querySelector("#tempurature").textContent = data.main.temp;
  document.querySelector("#wind").textContent = data.wind.speed;
  document.querySelector("#humidity").textContent = data.main.humidity;
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
    card.classList.add(
      "col-md-2",
      "forecast",
      "text-white",
      "m-2",
      "rounded"
    );

    let dateEl = document.createElement("p");
    dateEl.textContent = dayjs
      .unix(fiveDayData.list[i].dt)
      .format("MM/DD/YYYY");

    let tempEL = document.createElement("p");
    tempEL.textContent = fiveDayData.list[i].main.temp;

    let humidity = document.createElement("p");
    humidity.textContent = fiveDayData.list[i].main.humidity;

    let windSpeed = document.createElement("p");
    windSpeed.textContent = fiveDayData.list[i].wind.speed;
    card.append(dateEl, tempEL, humidity, windSpeed);
    document.querySelector("#forecast").append(card);
  }
}
