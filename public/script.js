let displayTime = document.querySelector(".time h1");

(function time() {
  let date = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  displayTime.innerHTML = date;
  setTimeout(time, 1000);
})();

/* Weather API import */
document.addEventListener("sdsdd", () => { //DOMContentLoaded

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
  .then(data=>data.json())
  .then(data => {console.log(data); setWeather(data)})

});

const icon = new Skycons({ color: "#fff" });
icon.set("icon", "clear-day");

const statusElem = document.querySelector("[data-status]");
const locationElem = document.querySelector("[data-location]");
const windElem = document.querySelector("[data-wind]");
const temperatureElem = document.querySelector("[data-temperature]");
const precipitationElem = document.querySelector("[data-precipitation]");
const pressureElem = document.querySelector("[data-pressure")
const visibilityElem = document.querySelector("[data-visibility")
const humidityElem = document.querySelector("[data-humidity")
 

function setWeather(data) {
  //console.log("here2")
  locationElem.textContent = "Dubai"; //Hardcoded. Change this depending on your location
  temperatureElem.textContent = data.temperature + "c";
  windElem.textContent = data.wind_speed + "km/h";
  precipitationElem.textContent = data.precip + "%";
  humidityElem.textContent = data.humidity + "%";
  visibilityElem.textContent = data.visibility + "km";
  pressureElem.textContent = data.pressure + "hPa";
  if (data.weather_code === 113) {
    icon.set("icon", "clear-day");
    icon.play();
  } else if (data.weather_code === 116) {
    icon.set("icon", "partly-cloudy-day");
    icon.play();
  } else if (data.weather_code === 119) {
    icon.set("icon", "cloudy");
    icon.play();
  } else if (data.weather_code === 122) {
    icon.set("icon", "cloudy");
    icon.play();
  } else if (data.weather_code === 143) {
    icon.set("icon", "cloudy");
    icon.play();
  } else if (data.weather_code === 248) {
    icon.set("icon", "fog");
    icon.play();
  } else if (data.weather_code === 176) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 179) {
    icon.set("icon", "snow");
    icon.play();
  } else if (data.weather_code === 182) {
    icon.set("icon", "sleet");
    icon.play();
  } else if (data.weather_code === 200) {
    //Thundery Outbreaks possible
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 227) {
    icon.set("icon", "wind");
    icon.play();
  } else if (data.weather_code === 230) {
    icon.set("icon", "snow");
    icon.play();
  } else if (data.weather_code === 248) {
    icon.set("icon", "fog");
    icon.play();
  } else if (data.weather_code === 260) {
    icon.set("icon", "fog");
    icon.play();
  } else if (data.weather_code === 263) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 266) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 281) {
    icon.set("icon", "sleet");
    icon.play();
  } else if (data.weather_code === 284) {
    icon.set("icon", "sleet");
    icon.play();
  } else if (data.weather_code === 293) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 296) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 299) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 302) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 305) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 308) {
    icon.set("icon", "rain");
    icon.play();
  } else if (data.weather_code === 311) {
    icon.set("icon", "sleet");
    icon.play();
  }
}
