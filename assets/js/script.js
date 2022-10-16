// ---- Global Variables
var text; // possibly won't need?
var userChoice;
var cityArray = [];
var currentW = {};
var futureW = {};
var nextFive = [];
var currentDate = dayjs().format('MM/DD/YYYY');
var recentSearches = [];
var defaultLocation = {
  lat: '30.2711286',
  long: '-97.7436995',
}

// ---- API Variables
let apiKey = '781113304cf386534c5b0247294afa0f';
let weatherIcon = 'http://openweathermap.org/img/wn/'

// put DOM elements in variables
// ---- User search
let searchBtn = document.querySelector('.btn-primary');
let userText = document.querySelector('.form-control');
let searchHistory = document.querySelector('.search-history');
let clearHistory = document.getElementById('clear-recent')
// ---- Current Weather display
let currentWeatherContainer = document.querySelector('.current-weather');
let loc = document.querySelector('.locationEL');
let temp = document.querySelector('.cTemp');
let wind = document.querySelector('.cWind');
let humidity = document.querySelector('.cHumidity');
let icon = document.querySelector('.currentIcon');
// ---- Future Weather Display
let futureContainer = document.querySelector('.future-days');
let futureDay = document.querySelectorAll('.fDay');
let futureTemp = document.querySelectorAll('.fTemp');
let futureWind = document.querySelectorAll('.fWind');
let futureHumidity = document.querySelectorAll('.fHumidity');
let futureIcon = document.querySelectorAll('.fIcon');
// ---- Choosing Modal 
let modalChooseCity = new bootstrap.Modal(document.getElementById('staticBackdrop'));
let modalHeader = document.getElementById('chooseCityHeader');
let modalBody = document.querySelector('modal-body');
let modalCities = document.getElementById('cityList');



// send city input to geoAPI
function useGeoApi(input) {
  let geoAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=5&appid=' + apiKey;
  
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
  // console.log('geo api function end'); used to check js flow
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

  // console.log('choose city function end'); used to check js flow
}

// retrieving lat and lon from li class
function getCoordinates(city){
  modalChooseCity.hide();
  
  // store search history in local storage
  userChoice = city.target.className.split(' '); // separating lat and lon numbers first item in array is lat, second item is lon

  
  let lat = userChoice[0];
  let lon = userChoice[1];
  
  // saving city
  // userChoice.push({});
  // userChoice[2].name = city.target.textContent;
  userChoice.push(city.target.textContent);
  // console.log(userChoice); 
  
  // send userChoice to local storage
  recentSearches.push(userChoice);
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  
  currentWeatherAPI(lat, lon);
  futureWeatherAPI(lat, lon);
  pastSearches();
  // futureWeatherAPI(userChoice);
  
  // console.log('get coordinates function end');
}

// send city lat and long to currentWeatherAPI
function currentWeatherAPI(lat, lon){
  
  let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
  
  fetch(weatherAPI)
  .then(function(response){
    return response.json();
    
  })
  .then(function(data){
    // console.log(data);
    currentW = data;
    // console.log(currentW);
    
    loc.textContent = currentW.name + ' (' + currentDate + ')';
    temp.textContent = Math.floor(currentW.main.temp) + '°F';
    wind.textContent = 'Wind ' + currentW.wind.deg + '°, ' + currentW.wind.speed + ' mph';
    humidity.textContent = 'Humidity: ' + currentW.main.humidity + '%';
    icon.src = weatherIcon + currentW.weather[0].icon + '.png';
    // console.log(weatherIcon + currentW.weather[0].icon);
  })
  // console.log('current weather function end'); used to check js flow
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
    // console.log(futureW);
    
    // nextFive variable to hold weather predictions for the next 5 days
    nextFive = [];
    for(let i = 3; i < futureW.list.length; i += 8){
      nextFive.push(futureW.list[i]);
    }
    
    
    
    // adding text to future forecast
    // var d = '';
    // var d2 = new Date();
    // console.log(d2);
    // console.log(d2.getUTCMonth());
    
    // loop through future forecast containers and populate with weather data
    for(let i = 0; i < nextFive.length; i++){ 
      
      var j = i + 1;
      var testDay = dayjs; // initializing date because this is what works for right now
      var futDay = dayjs().add(j, 'day');
      
      futureDay[i].textContent = futDay.format('MM/DD/YYYY');
      futureTemp[i].textContent = 'Temp: ' + Math.floor(nextFive[i].main.temp) + '°F';
      futureWind[i].textContent = 'Wind: ' + Math.floor(nextFive[i].wind.speed) + 'mph';
      futureHumidity[i].textContent = 'Humidity: ' + nextFive[i].main.humidity + '%';
      futureIcon[i].src = weatherIcon + nextFive[i].weather[0].icon + '.png';
      // console.log(weatherIcon + nextFive[i].weather[0].icon + '.png');
    }
    // console.log('Future weather function end'); used to check js flow
  })
  
}

// retrieve items from local storage
function pastSearches(){
  // localStorage.getItem('')
  searchHistory.innerHTML = '';

  // Render a new li for each todo
  for (var i = 0; i < recentSearches.length; i++) {
    var recentSearch = recentSearches[i];

    var li = document.createElement("li");
    li.textContent = recentSearch[2]
    li.setAttribute("class", recentSearch[0] + ' ' + recentSearch[1]);

    searchHistory.appendChild(li);
  }
  for (var i = 0; i < searchHistory.children.length; i++){
    searchHistory.children[i].addEventListener('click', getCoordinates);
  }
  
}

// clean local storage info
function cleanUp() {
  let storedSearches = JSON.parse(localStorage.getItem('recentSearches'));

  console.log(storedSearches.length);
  
  let unique = [];

  storedSearches.forEach((item) => {
    if(!unique.includes(item)){
      unique.push(item);
    }
  });

  console.log(unique);
  // let unique = [...new Set(storedSearches)]
  // console.log(unique) 
  
  // localStorage.setItem('recentSearches', unique);
}

// retrieve items and set html on page load
function init() {
  var storedSearches = JSON.parse(localStorage.getItem('recentSearches'));
  
  if (storedSearches !== null) {
    recentSearches = storedSearches;
    // currentWeatherAPI(recentSearches[0][0], recentSearches[0][1]);
  }

  currentWeatherAPI(defaultLocation.lat, defaultLocation.long)
  // call function to display recent searches in list
  // cleanUp();
  pastSearches();
}
init();
// get user input
searchBtn.addEventListener('click', function(){
  text = userText.value;
  // console.log(text);
  
  useGeoApi(text);

  // console.log('Event listener end') used to check js flow
})

clearHistory.addEventListener('click', function(){
  recentSearches = [];
  localStorage.clear();
  init();
})
