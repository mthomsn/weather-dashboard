// ---- Global Variables
var text; // possibly won't need?
var userChoice;
var cityArray = [];
var currentW = {};
var futureW = {};

// ---- API Variables
let apiKey = '781113304cf386534c5b0247294afa0f';
// let apiKey = 'b24d408f81e5d96c42b394dc394f05e9';

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
    // console.log(response);

    return response.json();
  })
  .then(function(data){
    // console.log(data);

    chooseCity(data);
    // if there is only one city result, then immediately send to weather api
    // if(data > 1){
    //   chooseCity(data);
    // } 
    // else{
    //   currentWeatherAPI(data)
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
    // console.log(cityArray);

    cityInfo.textContent = array[i].name + ', ' + array[i].state + ', ' + array[i].country;
    cityInfo.setAttribute('class', array[i].lat + " " + array[i].lon); // storing lat & lon in class to pull later
    
    //  list cities in modal and add event listeners
    modalCities.append(cityInfo);
    modalCities.addEventListener('click', getCoordinates);
  }
  
  modalChooseCity.show();
}

// retrieving lat and lon from li class
function getCoordinates(city){
  modalChooseCity.hide();
  
  // store search history in local storage
  userChoice = city.target.className.split(' '); // separating lat and lon numbers first item in array is lat, second item is lon
  let lat = userChoice[0];
  let lon = userChoice[1];
  // console.log(userChoice); 

  currentWeatherAPI(lat, lon);
  futureWeatherAPI(lat, lon);
  // futureWeatherAPI(userChoice);
}

// send city lat and long to currentWeatherAPI
function currentWeatherAPI(lat, lon){
  // let lat = input[0];
  // let lon = input[1];
  // console.log(lat);
  // console.log(lon);

  let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
  // console.log(weatherAPI);
  
  fetch(weatherAPI)
  .then(function(response){
    return response.json();
    
  })
  .then(function(data){
    // console.log(data);
    
    currentW = data;
    console.log(currentW);
    
  })
}

// send same city lat and long to futureWeatherAPI
function futureWeatherAPI(lat, lon){
  // let lat = input[0];
  // let lon = input[1];
  // console.log(lat);
  // console.log(lon);

  let futureWeatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=40&appid=5ab09b80e3343cae3223ba34d5813aba&units=imperial';
  // console.log(futureWeatherAPI);
  
  fetch(futureWeatherAPI)
  .then(function(response){
    return response.json();

  })
  .then(function(data){
    // console.log(data);

    futureW = data;
    console.log(futureW);
  })
}


// get user input
searchBtn.addEventListener('click', function(){
  text = userText.value;
  // console.log(text);
  
  useGeoApi(text);
})

// if previous search is clicked again, then display/re run API calls