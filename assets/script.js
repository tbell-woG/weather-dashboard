// This function declares the inital conditions for the const elements
function initPage(){
    //function initPage starts here
        const inputEl = document.getElementById("city-input");
        const searchEl = document.getElementById("search-button");
        const clearEl = document.getElementById("clear-history");
        const nameEl = document.getElementById("city-name");
        const currentPicEl = document.getElementById("current-picture");
        const currentTempEl = document.getElementById("temperature");
        const currentHumidityEl = document.getElementById("humidity");
        const currentWindEl = document.getElementById("wind-speed");
        const currentUVEl = document.getElementById("UV-index");
        const historyEl = document.getElementById("history");
        let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
        console.log(searchHistory);
        
        // This is the API Key
        const APIKey = "488c88235d7e5d5260ca69ec50ad255b";
        // This retrieves the current weather condition of the searched city from the Open Weather Map API
        function getWeather(cityName) {
            //function getWeather starts here
                    // let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIKey}"
                    
                    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
                    axios.get(getWeatherQueryURL)
                    .then(function(response){
                        console.log(response);
                        
                        // This parses the responses to display the current weather conditions of the searched city
                                const currentDate = new Date(response.data.dt*1000);
                                console.log(currentDate);
                                const day = currentDate.getDate();
                                const month = currentDate.getMonth();
                                const year = currentDate.getFullYear();
                                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                                let weatherPic = response.data.weather[0].icon;
                                currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                                currentPicEl.setAttribute("alt",response.data.weather[0].description);
                                currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                            let lat = response.data.coord.lat;
                            let lon = response.data.coord.lon;
                            "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "appid=" + APIKey;
                            axios.get(UVQueryURL)
                            .then(function(response){
                                //promise starts on line 47 and ends on line 55
                                let UVIndex = document.createElement("span");
                                UVIndex.setAttribute("class","badge badge-danger");
                                UVIndex.innerHTML = response.data[0].value;
                                currentUVEl.innerHTML = "UV Index: ";
                                currentUVEl.append(UVIndex);
                            });
                    // This displays the 5-day forecast for the searched city from the data retrieved from the Open Weather Map API
                        let cityID = response.data.id;
                        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityID + "appid=" + APIKey;
                        axios.get(forecastQueryURL)
                        .then(function(response){
                    
                            // This parses the responses to display the weather forecast for the next 5 days of the searched city
                            console.log(response);
                            const forecastEls = document.querySelectorAll(".forecast");
                                for (i=0; i<forecastEls.length; i++) {
                                    //for loop starts on line 69 and ends on line 91
                                forecastEls[i].innerHTML = "";
                                const forecastIndex = i*8 + 4;
                                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                                const forecastDay = forecastDate.getDate();
                                const forecastMonth = forecastDate.getMonth() + 1;
                                const forecastYear = forecastDate.getFullYear();
                                const forecastDateEl = document.createElement("p");
                                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                                forecastEls[i].append(forecastDateEl);
                                const forecastWeatherEl = document.createElement("img");
                                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                                forecastEls[i].append(forecastWeatherEl);
                                const forecastTempEl = document.createElement("p");
                                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                                forecastEls[i].append(forecastTempEl);
                                const forecastHumidityEl = document.createElement("p");
                                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                                forecastEls[i].append(forecastHumidityEl);
                            }
                    })
                });
        }
            //function getWeather ends here 
    
        
    searchEl.addEventListener("click",function() {
        const searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })
    clearEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })
    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}
//function initPage ends here
initPage();