class Weather {
    /**
     * Instantiate weather object to interact with OpenWeatherMap
     * API and return weather data to app to render visually
     */
    constructor() {
        this.setApiKey();
    }

    /**
     * Get OpenWeatherMap API key
     */
    setApiKey() {
        fetch('env.json').then(response => response.json())
        .then(env => this.apiKey = env.owmApiKey)
        .catch(() => document.body.innerHTML = "App failed to initialize");
    }

    /**
     * Get weather data for Map coordinates from OWM API
     */
    getWeather() {
        // Convert city + state to coordinates
        map.fetchCoordinates(city, state)
        .then(() => {
            // Hit OWM API with request
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${map.coords.lat}&lon=${map.coords.lng}&APPID=${wx.apiKey}`;
            
            fetch(url)
            .then(response => response.json())
            .then(data => this.data = data)
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    /**
     * Check coordinates returned from Map to see if they match a
     * city in the cities.json file. Not actually needed since
     * The OpenWeatherMap API will return the nearest result.
     * Probably for the best since check lacks precision.
     * 
     * @deprecated
     * @returns {boolean}
     */
    checkCoords() {
        let check = false;

        wx.cities.some((city) => {
            if (city.name === map.city) {
                if (
                    map.coords.lat.toFixed(0) === city.coord.lat.toFixed(0) &&
                    map.coords.lng.toFixed(0) === city.coord.lon.toFixed(0)
                ) {
                    check = true;
                }
            }
        })

        return check;
    }
}
