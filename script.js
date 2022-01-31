const locationBox = document.getElementById('locationBox');
const weather0 = document.getElementById('weather0');
const temp0 = document.getElementById('temp0');
const weather1 = document.getElementById('weather1');
const temp1 = document.getElementById('temp1');
const weatherIcon = document.getElementById('weatherIcon');
const highLow = document.getElementById("highLow");
const timeBox = document.getElementById("timeBox");
const weatherIconSmall = document.getElementById("weatherIconSmall");
const tempHourly = document.getElementById("tempHourly");

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
        var time = new Date(data.current.dt * 1000);
        var temp = Math.round(data.current.temp);
        var icon = data.current.weather[0].icon;
        weather0.innerHTML = data.current.weather[0].main;
        temp0.innerHTML = temp + '&deg;';
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png">`;
        highLow.innerHTML = "&uarr; " + Math.round(data.daily[0].temp.max) + '&deg; &darr; ' + Math.round(data.daily[0].temp.min) + '&deg;';
        data.hourly.forEach(element => {
          console.log("Here!");
          timeBox.innerHTML +='<span class="hfcTime"><div>'+ new Date(element.dt * 1000).toLocaleString("en-US", {hour: "numeric"}) + `</div><div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png"></div><div>${Math.round(element.temp)}&deg;</div>` +'</span>';
        });
      })
  .catch(e => console.log(e));
  })
.catch(e => console.log(e));





