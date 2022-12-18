// Weather API
// Geociding API

// Assigning API key to variable
const apiKey = "26b7283df774d23ad23929f9b2ab0395";

// reach into the html and grab the button you want to listen to
var enterBtn = document.querySelector("#btn");
console.dir(enterBtn);
const cityNameIn = document.querySelector("#cityName");

// add the event listener tool
enterBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = cityNameIn.value.trim();
  console.log(city);

  // ** get the value the user enter
  // reach into the html and grab the text box
  // sanity check - look at it to see what prop hold the value
  // extract that data

  // ** use that data to make a call to the api
  // try to make the call w/ static data first
  // once that works use the data you got form the user

  var url = "https://pokeapi.co/api/v2/pokemon/26";

  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      // all the coding that is based on data
      console.log(data);
      // ** put that data on the screent
    });
});
