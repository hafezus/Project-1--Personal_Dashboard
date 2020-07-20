let displayTime = document.querySelector(".time h1");

(function time() {
  let date = new Date().toLocaleTimeString();
  displayTime.innerHTML = date;
  setTimeout(time, 1000);
})();

/* Weather API import */

let selectCity = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);

weather.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) {
    return;
  }
  let lat = place.geometry.location.lat();
  let lon = place.geometry.location.lng();

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lon,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setWeather(data, place);
    });
});
