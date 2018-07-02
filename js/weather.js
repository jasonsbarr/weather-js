class Weather {
    /**
     * Instantiate weather object to interact with OpenWeatherMap API
     * 
     * @param {string} city
     * @param {string} state
     */
    constructor(city, state) {
        this.getApiKey();
        this.city = city;
        this.state = state;
    }

    async getApiKey() {
        fetch('env.json').then(response => response.json())
        .then(env => this.apiKey = env.owmApiKey)
        .catch(error => document.body.innerHTML = "App failed to initialize");
    }


}

