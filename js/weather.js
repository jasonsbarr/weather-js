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
    async fetchWeather(coords) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&APPID=${wx.apiKey}`;
        
        let wxResponse = await fetch(url);
        
        let wxData = await wxResponse.json();

        return wxData;
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
