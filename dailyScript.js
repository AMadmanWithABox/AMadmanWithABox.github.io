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
const toggleBtn = document.getElementById("toggleBtn");

var lat, lon;
var toggle = "day";

let url;
let api = '4d1ad29806f7880f7e028ce394d8b96a';
var city = 'Salt Lake City, UT';
let country = 'US';
let locationUrl;


genForecast("Salt Lake City");
function genForecast(city) {
    locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${api}`;
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
                    data.daily.forEach(element => {
                        timeBox.innerHTML += '<span class="hfcTime"><div>' + new Date(element.dt * 1000).toLocaleString("en-US", { weekday: "short" }) + ", " + new Date(element.dt * 1000).toLocaleString("en-US", { day: "numeric" }) + `</div><div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png"></div><div>${Math.round(element.temp.day)}&deg;</div>` + '</span>';
                    });
                    toggleBtn.addEventListener("click", toggleTime);
                    function toggleTime() {
                        timeBox.innerHTML = "";

                        if (toggle == "day") {
                            toggle = "night";
                            toggleBtn.innerText = "Night Temperatures";
                            data.daily.forEach(element => {
                                timeBox.innerHTML += '<span class="hfcTime"><div>' + new Date(element.dt * 1000).toLocaleString("en-US", { weekday: "short" }) + ", " + new Date(element.dt * 1000).toLocaleString("en-US", { day: "numeric" }) + `</div><div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png"></div><div>${Math.round(element.temp.night)}&deg;</div>` + '</span>';
                            });

                        } else if (toggle == "night") {
                            toggle = "day";
                            toggleBtn.innerText = "Day Temperatures";
                            data.daily.forEach(element => {
                                timeBox.innerHTML += '<span class="hfcTime"><div>' + new Date(element.dt * 1000).toLocaleString("en-US", { weekday: "short" }) + ", " + new Date(element.dt * 1000).toLocaleString("en-US", { day: "numeric" }) + `</div><div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png"></div><div>${Math.round(element.temp.day)}&deg;</div>` + '</span>';
                            });
                        }

                        toggleBtn.addEventListener("click", toggleTime);
                    }
                })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
        locationBox.addEventListener('keyup', function(e){
            if (e.keyCode === 13){
                e.preventDefault();
                city = locationBox.value;
                genForecast(city);
            }
        })
}


