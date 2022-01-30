const locationBox = document.getElementById('locationBox');
const weather0 = document.getElementById('weather0');
const temp0 = document.getElementById('temp0');
const weather1 = document.getElementById('weather1');
const temp1 = document.getElementById('temp1');
const weatherIcon = document.getElementById('weatherIcon');
const highLow = document.getElementById("highLow");

var lat, lon;

let url;
let api = 'a583d10a1a336af2dcb8986c2e7defb0';
let city = 'Salt Lake City, UT';
let country = 'US';
let locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${api}`


fetch(locationUrl)
  .then(response => response.json())
  .then(data => {
    lat = data[0].lat;
    lon = data[0].lon;
    locationBox.value = data[0].name + ", " + data[0].state;
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var temp = Math.round(data.current.temp);
        var icon = data.current.weather[0].icon;
        weather0.innerHTML = data.current.weather[0].main;
        temp0.innerHTML = temp + '&deg;';
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png">`;
        highLow.innerHTML = "&uarr; " + Math.round(data.daily[0].temp.max) + '&deg; &darr; ' + Math.round(data.daily[0].temp.min) + '&deg;';
        weather1.innerHTML = data.daily[1].weather[0].main;
        temp1.innerHTML = data.daily[1].temp.max + ' &deg;F';
      })
  .catch(e => console.log(e));
  })
.catch(e => console.log(e));





