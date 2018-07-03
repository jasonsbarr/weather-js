class Map {
    /**
     * Initialize Map object to communicate with MQ API
     */
    constructor() {
        // Set API key and get coordinates
        fetch('env.json').then(response => response.json())
        .then(env => this.apiKey = env.mqApiKey)
        .catch(() => document.body.innerHTML = "App failed to initialize");
    }

    /**
     * Fetch coordinates for city + state from MapQuest API

     */
    async fetchCoordinates() {
        // Set URL to city + state
        let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${this.apiKey}&location=${this.city}%2C${this.state.replace(' ', '+')}`;

        // Get response from MQ server
        let coordsResponse = await fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error))
        
        this.coords = coordsResponse.results[0].locations[0].latLng;
    }

    setCityAndState(city, state) {
        this.city = city;
        this.state = state;
    }
}