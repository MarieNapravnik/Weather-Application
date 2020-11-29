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

//Weather Conditions Stars 

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
//Weather Conditions Ends 


//Search Engine Starts

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let apiKey = "27b4bb30993897eb41fd3193d860c853";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
}

//Search Engine Ends


// Default city Starts
function displayDefault(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature")
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description; 
  iconElement.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
}

let units = "metric";
  let apiKey = "27b4bb30993897eb41fd3193d860c853"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayDefault);

// Default city Ends


//Weather forecast starts
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
            src= http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png 
            alt= ${forecast.weather[0].description}
            />
            
            <div class="weather-forecast-temperature">
              <strong> ${Math.round(forecast.main.temp_max)}Cº </strong> 
              ${Math.round(forecast.main.temp_min)
            }Cº
            </div>
          </div>
    `;   
    }
}
//Weather forecast ends

//Display Forecast



  
