var APIKey = "ca5b1056171bcea6221339007b4c1de2";
// Collect user input for the city name and store it in a variable
var city;

// Target the search button to respond to a click
document.querySelector("#search").addEventListener("click", function () {

    // Store searched cities into local storage
    var history = JSON.parse(localStorage.getItem("cities")) || []
    var city = document.querySelector("#input").value
    if (!history.includes(city)) {
        history.push(city)
    }
    localStorage.setItem("cities", JSON.stringify(history))
    document.querySelector("#history").innerHTML = ''

    // Each searched city creates a new button element in left panel under search
    for (var i = 0; i < history.length; i++) {
        var item = document.createElement("button")
        item.innerText = history[i]
        document.querySelector("#history").appendChild(item)
    }

    // City and API keys are concatenated into API URL for main city section
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (res) {
            return res.json()
        })

        // Targeting main city section and adding weather details from API call, then converting date with dayJS
        .then(function (data) {
            document.querySelector("#city-name").innerText = data.name + ' - ' + dayjs.unix(data.dt).format('MM/DD/YYYY');
            document.querySelector("#temp").innerText = "Temp: " + data.main.temp + "°F"
            document.querySelector("#wind").innerText = "Wind: " + data.wind.speed + " mph"
            document.querySelector("#humidity").innerText = "Humidity: " + data.main.humidity + "%"

            // City and API keys are concatenated into API URL for 5 day forecast section
            var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
            fetch(fiveDayURL)
                .then(function (res) {
                    return res.json()
                })

                // Object returns hourly data, looping through a full 40 hour week
                .then(function (data) {
                    document.querySelector("#fiveDay").innerHTML = ""
                    for (let i = 7; i < data.list.length; i += 8) {
                        const day = data.list[i];
                        var weekday = dayjs.unix(day.dt).format('dddd');
                        var divEl = document.createElement("div")
                        divEl.classList.add("card")
                        var dateEl = document.createElement("p")
                        dateEl.innerText = weekday
                        divEl.appendChild(dateEl)
                        var icon = document.createElement("img")
                        icon.src = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"
                        divEl.appendChild(icon)

                        // Adding and appending 5 day forecast details
                        var cardTemp = document.createElement("p")
                        cardTemp.innerText = "Temp: " + day.main.temp + "F"

                        var cardWind = document.createElement("p")
                        cardWind.innerText = "Wind: " + day.wind.speed + "MPH"

                        var cardHumidity = document.createElement("p")
                        cardHumidity.innerText = "Humidity: " + day.main.humidity + "%"

                        divEl.appendChild(cardTemp)
                        divEl.appendChild(cardWind)
                        divEl.appendChild(cardHumidity)

                        document.querySelector("#fiveDay").appendChild(divEl)
                    }
                })
        })
});