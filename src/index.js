
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





function search(event) {
  event.preventDefault();
  let apiKey = "27b4bb30993897eb41fd3193d860c853";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
