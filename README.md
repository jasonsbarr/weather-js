# WeatherJS

Vanilla JavaScript app using fetch() with async/await to query OpenWeatherMap's Current Weather Data API with coordinates retrieved from MapQuest's Geocoding API to display weather information for any location in the US, Canada, or Mexico.

## Usage

As you type a location into the search bar the results are sent to MapQuest's Search Ahead API to dynamically populate datalist options for the search.

On form submission the query is sent to MapQuest's Geocoding API to get latitude/longitude coordinates, which are then passed to OpenWeatherMap to retrieve current weather data for the location.

## Important security note

Do NOT deploy this app to a publicly-facing server. Even though my API keys are kept out of the repo, this is just a prototype with all data available client-side. A savvy user could retrieve your API keys and potentially cause you trouble. If you want to deploy to a public server you'll need to add a server-side handler to protect your API keys.
