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

let apiRequest;
let appId = "d710a4aa5b152e9b5fe7739a6ccca894";


document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
  weatherButton.onclick = getWeather;
  }
};

function getWeather() {
  //code that fetches API data and stores it in results
  let url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=<appId>";
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
    highTemp.innerHTML = convertKtoF(response.main.temp_max);
    lowTemp.innerHTML = convertKtoF(response.main.temp_min);
    humidity.innerHTML = response.main.humidity;
    wind.innerHTML = response.wind.speed;
    condition.innerHTML = response.weather[0].main;
    console.log(response.weather);
    // displayImage(response.weather.main);
		// output.style.display = 'block';
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
