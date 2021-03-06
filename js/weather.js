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
        .catch(() => ui.showError("App failed to initialize"));
    }

    /**
     * Get weather data for Map coordinates from OWM API
     */
    async fetchWeather(lat, lon) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${wx.apiKey}`;
        
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

    /**
     * Convert temperature in Kelvins to degrees Fahrenheit
     * @param {float} kelvin 
     */
    kelToF(kelvin) {
        return (kelvin * 9/5) - 459.67;
    }

    /**
     * Convert barometric pressure from hPa to in+Hg
     * @param {integer} hpa 
     */
    hPaToInHg(hpa) {
        return hpa * 0.02953;
    }

    /**
     * Convert wind speed from meters/second to miles/hour
     * 
     * @param {float} ms 
     */
    msToMph(ms) {
        return ms * 2.23694;
    }
}
