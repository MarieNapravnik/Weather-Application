
let now = new Date();

let li = document.querySelector("li");

let date = now.getDate();
let hour = now.getHours();
if (hour <10){
  hour = `0${hour}`;
}


let minutes = now.getMinutes();
if (minutes <10){
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

li.innerHTML = `${day}, ${hour}:${minutes}`;


function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

//Weather and weather forecast
function displayForecast(response){


let forecastElement = document.querySelector("#forecast");
let forecast = response.data.list[0];

console.log(forecast);

  forecastElement.innerHTML = `
  <div class="col-2">
  <h5>
    12:00
  </h5>
  <img 
  src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png" 
  alr="" 
  />
  <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
  </div>
</div>
`;


}



//API Applied
function search(event) {
  event.preventDefault();
  let apiKey = "27b4bb30993897eb41fd3193d860c853";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
}
//

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
