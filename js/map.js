class Map {
    /**
     * Initialize Map object to communicate with MQ API
     */
    constructor() {
        // Set API key and get coordinates
        fetch('env.json').then(response => response.json())
        .then(env => this.apiKey = env.mqApiKey)
        .catch(() => ui.showError("App failed to initialize"));
    }

    /**
     * Fetch coordinates for city + state from MapQuest API

     */
    async fetchCoordinates(location) {
        // Set location so UI can access it
        this.location = location;
        // Set URL to query location
        let url = `https://www.mapquestapi.com/geocoding/v1/address?key=${this.apiKey}&location=${location}`;

        // Get response from MQ server
        let coordsJson = await fetch(encodeURI(url))
            .then(response => response.json())
            .catch(() => ui.showError("Fetching coordinates failed. Please try again."));

        return coordsJson.results[0].locations[0].latLng;
    }

    /**
     * Fetch options from MQ API to populate search datalist
     * 
     * @param {string} query Input from search form
     */
    async fetchOptions(query) {
        let url = `https://www.mapquestapi.com/search/v3/prediction?key=${this.apiKey}&limit=7&collection=adminArea&countryCode=us,ca,mx&q=${query}`;

        let optionsResponse = await fetch(encodeURI(url))
        .then(response => response.json())
        .catch(() => ui.showError("An error occurred. Please try again."));

        return optionsResponse.results;
    }
}