//Date and Time Starts
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

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10) { hours = `0${hours}`
        };
    let minutes = date.getMinutes();
    if (minutes<10) { minutes = `0${minutes}`
        }; 
    return `${hours}:${minutes}`;
}

//Date and Time Ends 

///***
function displayTemperature (response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let iconElement = document.querySelector("#icon");


temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name; 
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description); 
}; 

///***

////////
function displayForecast(response){
    let forecastElement = document.querySelector("#forecast"); 
    forecastElement.innerHTML = null; 
    let forecast = null; 
   
    for (let index = 0; index < 6; index++) {
         let forecast = response.data.list[index]; 
        forecastElement.innerHTML +=`
     <div class="col-2">
            <h5> 
            ${formatHours(forecast.dt*1000)} 
            </h5>
            <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>

            <div class="weather-forecast-temperature">
              <strong> ${Math.round(forecast.main.temp_max)}Cº </strong> 
              ${Math.round(forecast.main.temp_min)
            }Cº
            </div>
          </div>
    `;   
    }
}

function search(city) {
  let apiKey = "27b4bb30993897eb41fd3193d860c853";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Prague");




  
