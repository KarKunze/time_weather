
  setInterval(myTimer, 1000);
  function myTimer(){
    let currentDate = new Date();
    document.getElementById("date").innerHTML = currentDate.toLocaleString();
  }

// let currentDate = new Date();
// let dateStr = currentDate.toLocaleString();
// document.getElementById("date").innerHTML = dateStr;

let date = document.getElementById("date");
let city = document.getElementById("city");
let tempF = document.getElementById("tempF");
let tempC = document.getElementById("tempC");
let highTemp = document.getElementById("highTemp");
let lowTemp = document.getElementById("lowTemp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let condition = document.getElementById("condition");
let weatherImage = document.getElementById('weatherImage');
let bg = document.getElementById('bg');

let apiRequest;
let appId = "d710a4aa5b152e9b5fe7739a6ccca894";


document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
  weatherButton.onclick = getWeather;
  }
};

function getWeather() {
  //code that fetches API data and stores it in results
  let url = "https://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=<appId>";
  url = url.replace("<zipCode>", zipInput.value);
  url = url.replace("<appId>", appId);
  //code that fetches data from the API URL and stores it in results.
  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  // apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();
}



function catchResponse() {

  if (apiRequest.statusText === "OK") {

    let response = JSON.parse(apiRequest.responseText);

    // error.style.display = "none";
    city.innerHTML = response.name;
    tempF.innerHTML = convertKtoF(response.main.temp) + "&degF";
    // tempC.innerHTML = convertKtoC(response.main.temp) + "&degC";
    highTemp.innerHTML = "High " + convertKtoF(response.main.temp_max) + "&degF";
    lowTemp.innerHTML = "Low " + convertKtoF(response.main.temp_min) + "&degF";
    humidity.innerHTML = "Humidity " + response.main.humidity + "&#37;";
    wind.innerHTML = "Wind speed " + convertMperStoMPH(response.wind.speed) + " mph";
    condition.innerHTML = response.weather[0].main;
    // console.log(response.weather);
    displayImage.innerHTML = displayImage(response.weather[0].main);
		// output.style.display = 'block';
    bg.style.backgroundImage = displayImage(response.weather[0].main);
  }
}

  function convertKtoF(kelvin) {
    let fahrenheit = kelvin * (9/5) - 459.7;
    return Math.round(fahrenheit);
  }


  function convertKtoC(kelvin) {
    let celsius = kelvin - 273.15;
    return Math.round(celsius);
  }

  function convertMperStoMPH(MperS) {
    let mph = MperS * 2.2369;
    return Math.round(mph*10)/10;
  }


  function displayImage(condition) {
    let now = new Date();
    let hr = now.getHours();

    if (condition.toLowerCase().includes("clouds") && hr >= 5 && hr <= 20) {
      return 'url("images/clouds.jpg")';
    }
    else if (condition.toLowerCase().includes("rain") && hr >= 5 && hr <= 20) {
      return 'url("images/abstract-background-blue-311039.jpg")';
    }
    else if (condition.toLowerCase().includes("clear") && hr >= 5 && hr <= 20) {
      return 'url("images/air-atmosphere-blue-96622.jpg")';
    }
    else if (condition.toLowerCase().includes("thunderstorm") && hr >= 5 && hr <= 20) {
      return 'url("images/cloudiness-clouds-cloudscape-1074428.jpg")';
    }
    else if (condition.toLowerCase().includes("drizzle") && hr >= 5 && hr <= 20) {
      return 'url("images/abstract-background-blue-311039.jpg")';
    }
    else if (condition.toLowerCase().includes("snow") && hr >= 5 && hr <= 20) {
      return 'url("images/abstract-blur-bright-286198 (1).jpg")';
    }
    else if (condition.toLowerCase().includes("clouds") && hr > 20 && hr < 5) {
      return 'url("images/nightclouds.jpg")';
    }
    else if (condition.toLowerCase().includes("rain") && hr > 20 && hr < 5) {
      return 'url("images/nightrain.jpg")';
    }
    else if (condition.toLowerCase().includes("clear") && hr > 20 && hr < 5) {
      return 'url("images/galaxy-infinity-milky-way-110854.jpg")';
    }
    else if (condition.toLowerCase().includes("thunderstorm") && hr > 20 && hr < 5) {
      return 'url("images/nightstorm.jpg")';
    }
    else if (condition.toLowerCase().includes("drizzle") && hr > 20 && hr < 5) {
      return 'url("images/nightrain.jpg")';
    }
    else if (condition.toLowerCase().includes("snow") && hr > 20 && hr < 5) {
      return 'url("images/darksnow.jpg")';
    }
    else {
      return 'url("images/foggy.jpg")';
    }

  }
