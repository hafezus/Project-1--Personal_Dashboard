let displayTime = document.querySelector(".time h1");

(function time() {
  let date = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  displayTime.innerHTML = date;
  setTimeout(time, 1000);
})();

/* Weather API */
document.addEventListener("DOMContentLoaded", () => {
  //DOMContentLoaded

  /* 
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      setWeather(data);
    });
  */
    fetch("/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      }).catch((data)=>{
        
        console.log("Some error in news api fetch")
      })
});


const icon = new Skycons({ color: "#fff" });
icon.set("icon", "clear-day");

const statusElem = document.querySelector("[data-status]");
const locationElem = document.querySelector("[data-location]");
const windElem = document.querySelector("[data-wind]");
const temperatureElem = document.querySelector("[data-temperature]");
const precipitationElem = document.querySelector("[data-precipitation]");
const pressureElem = document.querySelector("[data-pressure");
const visibilityElem = document.querySelector("[data-visibility");
const humidityElem = document.querySelector("[data-humidity");

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

const newsHeadlines = document.querySelector(".news .headlines")
let xx = document.createElement("h1")
xx.innerHTML="Hellooooo"
console.log(xx)
newsHeadlines.append(xx)


function setNews(data){
  data.articles.forEach((item)=>{
    let title = document.createElement("a")
    let time = document.createElement("p")
    let byline = document.createElement("p")
    let headline = document.createElement("div")
    headline.innerHTML = `<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        <tr>`;
  })

}

/* To-do list */

let todo_container = document.querySelector(".to-do-list");
let listItem_add = document.querySelector(".to-do-list button");

//listItem_add.textContent = "aDD";
//let edit = document.createElement("button");
let del = document.createElement("button");

/* Add list item */
listItem_add.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);

  del = document.createElement("button");
  
  let label = document.createElement("label");
  label.contentEditable = "true" 
  label.style = "min-width:15px;" //To be able to click on empty label

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className += "check";
  
  del.className += "btn btn-danger pt-0 delete float-md-right";
  del.textContent = "x";

  let item_container = document.createElement("div");
  
  item_container.append(checkbox);
  item_container.append(label);
  item_container.append(del);

  todo_container.querySelector(".pending").appendChild(item_container);
});


let todolistContainer = document.querySelector(".to-do-list");

//Delete item, or check/uncheck item
todolistContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    e.target.parentNode.remove();
  }

  //Move item from pending to completed
  if (e.target.checked && e.target.className.includes("check")) {
    todo_container.querySelector(".completed").appendChild(e.target.parentNode);
  }

  //Move item from completed to pending
  if (!e.target.checked && e.target.className.includes("check")) {
    todo_container.querySelector(".pending").appendChild(e.target.parentNode);
  }
});

class Store {
  static getList() {
    let list;
    if (localStorage.getItem("list") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }
    return list;
  }

  static addBook(item) {
    const list = Store.getList();

    list.push(item);

    localStorage.setItem("list", JSON.stringify(list));
  }

  static removeBook(isbn) {
    const list = Store.getList();
    list.forEach((item, index) => {
      if (item.isbn === isbn) {
        list.splice(index, 1);
      }
    });

    localStorage.setItem("list", JSON.stringify(list));
  }
}
