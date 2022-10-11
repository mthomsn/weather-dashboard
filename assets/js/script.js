// ---- Global Variables
var text; // possibly won't need?
var userChoice;
var cityArray = [];

// ---- API Variables
let apiKey = '781113304cf386534c5b0247294afa0f';

// let weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=30.266666&lon=-97.733330&appid=' + apiKey;
// let geoAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + text + '&limit=5&appid=' + apiKey; 

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
let futureContainer = document.querySelector('.future-days');
let futureDay = document.querySelectorAll('.fDay');
let futureTemp = document.querySelectorAll('.fTemp');
let futureWind = document.querySelectorAll('.fWind');
let futureHumidity = document.querySelectorAll('.fHumidity');
// ---- Choosing Modal 
let modalChooseCity = new bootstrap.Modal(document.getElementById('staticBackdrop'));
let modalHeader = document.getElementById('chooseCityHeader');
let modalBody = document.querySelector('modal-body');
let modalCities = document.getElementById('cityList');



// send city input to geoAPI
function useGeoApi(input) {
  let geoAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=5&appid=' + apiKey;
  
  fetch(geoAPI)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log(data);
    chooseCity(data);
    // if(data > 1){
    //   chooseCity(data);
    // } 
    // else{
    //   useWeatherApi(data)
    // }
  })
}

// function to choose city
function chooseCity(array){
  cityArray = [];
  modalCities.textContent = '';

  // iterate through array and append 
  for (let i = 0; i < array.length; i++){
    let cityInfo = document.createElement('li');

    cityArray.push(array[i]);
    // cityArray.push(array[i].country + ' ' + array[i].lat + ' ' + array[i].lon);
    console.log(cityArray);
    cityInfo.textContent = array[i].name + ', ' + array[i].state + ', ' + array[i].country;
    cityInfo.setAttribute('class', array[i].lat + " " + array[i].lon);
    
    // putting list of cities into modal and add event listener
    modalCities.append(cityInfo);
    modalCities.addEventListener('click', getCoordinates);
  }

  modalChooseCity.show();
}

// retrieving lat and lon
function getCoordinates(city){
  userChoice = city.target.className.split(' ');
  console.log(userChoice); // first item in array is lat, second item is lon

}

// send city lat and long to weatherAPI
function useWeatherApi(input){

  let weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=-' + lon + '&appid=' + apiKey;
}

// pull out Temp, wind, and humidity for current day + 5 days out

// store search history in local storage

// if previous search is clicked again, then display/re run API calls

// get user input
searchBtn.addEventListener('click', function(e){
  text = userText.value;
  console.log(text);

  useGeoApi(text);

  // this works
  // fetch(geoAPI)
  // .then(function(response){
  //   console.log(response);
  //   return response.json();
  // })
  // .then(function(data){
  //   console.log(data);
  //   return data;
  // })
})
