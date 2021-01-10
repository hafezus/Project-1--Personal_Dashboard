let displayTime = document.querySelector(".time h1");

(function time() {
	let date = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	displayTime.innerHTML = date;
	setTimeout(time, 1000);
})();

/* Calendar */

// Client ID and API key from the Developer Console
var CLIENT_ID = "100494644665-e1jikfm2ete1lmt78qcchqq2dnkaj29b.apps.googleusercontent.com";
//var CLIENT_ID = process.env.CALENDAR_CLIENT_ID;
var API_KEY = "AIzaSyD1L48t1sn-i-CeNbz36L6_4aViNfuIc5s";
//var API_KEY = process.env.CALENDAR_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client
		.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
		})
		.then(
			function () {
				// Listen for sign-in state changes.
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

				// Handle the initial sign-in state.
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
				authorizeButton.onclick = handleAuthClick;
				signoutButton.onclick = handleSignoutClick;
			},
			function (error) {
				appendPre(JSON.stringify(error, null, 2));
			}
		);
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = "none";
		signoutButton.style.cssText = `display:block;`;
		listUpcomingEvents();
	} else {
		signoutButton.style.display = "none";
		authorizeButton.style.cssText = `display:block;`;
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
	var pre = document.getElementById("content");
	pre.innerHTML = "";
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message, when) {
	var pre = document.getElementById("content");

	var textContent = document.createElement("p");
	//textContent.style.display = 'block';
	textContent.textContent += message.toString();
	textContent.style.cssText = `
		display: inline;
		width: 50%;
	`;

	var whenContent = document.createElement("p");
	whenContent.textContent += when.toString();
	whenContent.style.cssText = `
		display:inline;
		width:50%;
		text-align: right;
	`;

	let divContent = document.createElement("div");
	divContent.style.cssText = `
		display:flex;
	`;

	divContent.appendChild(textContent);
	divContent.appendChild(whenContent);

	pre.style.cssText = `
		color: #fff;
		font-family: sans-serif, helvetica, consolas;
		display:none;
	  `;
	  //display:none;
	pre.appendChild(divContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

let eventsList = [];

async function listUpcomingEvents() {
	gapi.client.calendar.events
		.list({
			calendarId: "primary",
			timeMin: new Date().toISOString(),
			showDeleted: false,
			singleEvents: true,
			maxResults: 10,
			orderBy: "startTime",
		})
		.then(async function (response) {
			var events = response.result.items;

			if (events.length > 0) {
				for (i = 0; i < events.length; i++) {
					var event = events[i];
					eventsList.push({
						title: events[i].summary,
						start: events[i].start.date,
						end: events[i].end.date,
					});

					var when = event.start.dateTime;
					if (!when) {
						when = event.start.date;
					}
					console.log(eventsList);
					let calendarEl = document.getElementById("calendar");

					let calendar = new FullCalendar.Calendar(calendarEl, {
						initialDate: "2021-01-10",
						editable: true,
						selectable: true,
						businessHours: true,
						dayMaxEvents: true,
						events: eventsList, //new Array({title: "gay lord", start: "2021-01-12", end: "2021-01-13"})
					});
					//console.log(eventsList);

					calendar.render();
					//console.log(event)
					appendPre(event.summary, when);
				}
			} else {
				appendPre("No upcoming events found.", "");
			}
		});
}

/* Weather API */
document.addEventListener("DOMContentLoaded", () => {
	//DOMContentLoaded

	///*
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
		})
		.catch((data) => {
			console.log("Some error in news api fetch");
		});
	//*/
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
		})
		.catch((data) => {
			console.log("Some error in news api fetch");
		});
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
	temperatureElem.textContent = data.temperature + "\u00B0C";
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
	} else if (
		data.weather_code === 119 ||
		data.weather_code === 122 ||
		data.weather_code === 143
	) {
		icon.set("icon", "cloudy");
		icon.play();
	} else if (data.weather_code === 179 || data.weather_code === 230) {
		icon.set("icon", "snow");
		icon.play();
	} else if (data.weather_code === 227) {
		icon.set("icon", "wind");
		icon.play();
	} else if (data.weather_code === 248 || data.weather_code === 260) {
		icon.set("icon", "fog");
		icon.play();
	} else if (
		data.weather_code === 176 ||
		data.weather_code === 200 ||
		data.weather_code === 263 ||
		data.weather_code === 266 ||
		data.weather_code === 266 ||
		data.weather_code === 293 ||
		data.weather_code === 296 ||
		data.weather_code === 299 ||
		data.weather_code === 302 ||
		data.weather_code === 305 ||
		data.weather_code === 308
	) {
		icon.set("icon", "rain");
		icon.play();
	} else if (
		data.weather_code === 182 ||
		data.weather_code === 281 ||
		data.weather_code === 284 ||
		data.weather_code === 311
	) {
		icon.set("icon", "sleet");
		icon.play();
	}
}

const newsHeadlines = document.querySelector(".news .headlines");
let div = document.createElement("div");
//xx.innerHTML="Hellooooo"
//console.log(xx)
newsHeadlines.append(div);

function setNews(data) {
	data.articles.forEach((item) => {
		console.log(item.description);
		newsHeadlines.append(div);
		let title = document.createElement("a");
		title.href = item.url;
		title.style = "color:#ccc;";
		let time = document.createElement("p");
		let byline = document.createElement("p");
		let rule = document.createElement("hr");
		let image = document.createElement("img");
		rule.style.backgroundColor = "rgb(129, 127, 127)";
		rule.style.margin = "10px";
		div.append(image, title, time, rule);
		title.innerHTML = item.title;
		byline.innerHTML = item.author;
		time.innerHTML = new Date(Date.parse(item.publishedAt)).toDateString();
		image.src = item.urlToImage;
		image.style.onerror = "https://i.stack.imgur.com/y9DpT.jpg";

		//byline.style.float = "right"

		image.style.float = "left";
		image.style.paddingRight = "5px";
		image.style.width = "128px";
		image.style.height = "64px";
		//image.innerHTML = item.
		div.class += "border border-white";

		console.log(data);
	});
}

/* To-do list */

let todo_container = document.querySelector(".pending");
let listItem_add = document.querySelector(".to-do-list button");
let del = document.createElement("button");
let list = [];
/* 
	{ id, content }
*/

listItem_add.addEventListener("click", (e) => {
	let newItem = document.createElement("div");
	newItem.className += "list_item";
	newItem.style.display = "inline";

	let itemCheckbox = document.createElement("input");
	itemCheckbox.type = "checkbox";
	itemCheckbox.id = Math.random(100_000_000_000);

	//let roundDiv = document.createElement("div")
	//roundDiv.style.position = "relative"

	let roundDiv = document.createElement("div");
	roundDiv.className += "round";

	let roundLabel = document.createElement("label");

	roundDiv.appendChild(roundLabel);
	roundDiv.appendChild(itemCheckbox);

	roundLabel.style.cssText = `background-color: #fff;
    border: 1px solid rgb(185, 163, 163);
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: -25px;
    position: absolute;
    top: 0;
    width: 28px;
    margin-left:6.5px;
    transition:cubic-bezier(0.19, 1, 0.22, 1);
	transition-duration: 300ms;
	`;

	roundLabel.after.cssText = `
	border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
	width: 12px;
	`;
	roundLabel.htmlFor = itemCheckbox.id;
	//itemCheckbox.style.visibility = "hidden"
	if (roundLabel.type === "checkbox" && itemCheckbox.checked) {
	}
	itemCheckbox.addEventListener("click", (e) => {
		console.log(e.target.checked);
		if (e.target.checked) {
			roundLabel.style.cssText = `
			background-color: #66bb6a; 
			border-color: #66bb6a; 
			opacity: 1;`;

			//console.log(e.target.parentNode.parentNode.querySelector("label"))

			e.target.parentNode.parentNode.querySelector(
				"label"
			).style.textDecoration = "line-through";
			e.target.parentNode.parentNode.querySelector(
				"label"
			).contentEditable = false;
		} else if (!e.target.checked) {
			roundLabel.style.cssText = `
			background-color: #fff;
			border: 1px solid rgb(185, 163, 163);
			border-radius: 50%;
			cursor: pointer;
			height: 28px;
			left: -25px;
			position: absolute;
			top: 0;
			width: 28px;
			margin-left:6.5px;
			transition:cubic-bezier(0.19, 1, 0.22, 1);
			transition-duration: 300ms;
			`;

			e.target.parentNode.parentNode.querySelector(
				"label"
			).style.textDecoration = "none";
			e.target.parentNode.parentNode.querySelector(
				"label"
			).contentEditable = true;
		}
		//if(e.checked)
	});

	if (itemCheckbox.checked) {
	}

	// roundLabel.forEach((item) =>{
	// 	if (item.type)
	// 	roundLabel.style.

	// })

	let itemContent = document.createElement("label");
	itemContent.contentEditable = true;
	itemContent.title = "New todo item";
	itemContent.style = "width:70%;";
	itemContent.style.marginLeft = "10px";
	itemContent.style.marginTop = "5px";
	itemContent.style.outline = "none";
	itemContent.style.color = "white";
	itemContent.style.fontSize = "16px"

	let horizontalRule = document.createElement("hr");
	horizontalRule.style.padding = "0px";
	horizontalRule.style.margin = "10px";
	horizontalRule.style.backgroundColor = "rgba(256, 256, 256, 0.5)";

	newItem.appendChild(itemContent);
	newItem.appendChild(roundDiv);
	newItem.appendChild(horizontalRule);

	todo_container.append(newItem);
});

// document.addEventListener('DOMContentLoaded', function() {
// 	//let elems = document.querySelectorAll('.datepicker');

// 	//var instances =
// 	//M.Datepicker.init(elems);

// });
