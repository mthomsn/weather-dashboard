let apiKey = '&appid=b24d408f81e5d96c42b394dc394f05e9&units=imperial'
let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=30.2711286&lon=-97.7436995${apiKey}`

let geoAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=Austin&limit=5'

// put this in function
// fetch(weatherAPI)
//   .then(function(response){
//     console.log(response);
//     return response.json();
//   })
//   .then(function(data){
//     console.log(data);
//   })

// put DOM elements in variables
// ---- User search
let searchBtn = document.querySelector('.btn-primary');
let userText = document.querySelector('.form-control');
let searchHistory = document.querySelector('.search-history');
// ---- Current Weather display
let currentWeatherContainer = document.querySelector('.current-weather');
let loc = document.querySelector('.locationEL');
let temp = document.querySelector('.fTemp');
let wind = document.querySelector('.fWind');
let humidity = document.querySelector('.fHumidity');
// ---- Future Weather Display
let futureContainer = document.querySelector('.future-days')

// take user input

// take user city text input

// send city input to geoAPI

// send city long and lat to weather API

// pull out Temp, wind, and humidity for current day + 5 days out

// store search history in local storage

// if previous search is clicked again, then display/re run API calls