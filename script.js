var APIKey = "ca5b1056171bcea6221339007b4c1de2";
// Collect user input for just the city name and store it in a variable
var city;

document.querySelector("#search").addEventListener("click", function () {
    var city = document.querySelector("#input").value
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
            document.querySelector("#city-name").innerText = data.name
            document.querySelector("#temp").innerText = "Temp: " + data.main.temp + "F"
            document.querySelector("#wind").innerText = "Wind: " + data.wind.speed + "MPH"
            document.querySelector("#humidity").innerText = "Humidity: " + data.main.humidity + "%"

            var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
            fetch(fiveDayURL)
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    console.log(data);
                    for (let i = 7; i < data.list.length; i+=8) {
                        const day = data.list[i];
                        // create card element
                        var divEl = document.createElement("div")
                        var dateEl = document.createElement("p")
                        dateEl.innerText = day.dt
                        divEl.appendChild(dateEl)

                        // use dayjs to convert the text in card
                        // create the other 4 cards first
                        document.querySelector("#fiveDay").appendChild(divEl)
                    }
                })
                })
        });



// The Fetch API is a Web API built into the browser that allows you to make server-side API calls without having to use AJAX and install a bulky library like jQuery.


