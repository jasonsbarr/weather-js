# WeatherJS

Vanilla JavaScript app using fetch() with async/await to query OpenWeatherMap's Current Weather Data API with coordinates retrieved from MapQuest's Geocoding API to display weather information for any location in the US, Canada, or Mexico.

## Usage

As you type a location into the search bar the results are sent to MapQuest's Search Ahead API to dynamically populate datalist options for the search.

On form submission the query is sent to MapQuest's Geocoding API to get latitude/longitude coordinates, which are then passed to OpenWeatherMap to retrieve current weather data for the location.

## Important security note

Do NOT deploy this app to a publicly-facing server. Even though my API keys are kept out of the repo, this is just a prototype with all data available client-side. A savvy user could retrieve your API keys and potentially cause you trouble. If you want to deploy to a public server you'll need to add a server-side handler to protect your API keys.

## Copyright & License Info
&copy; 2018 Jason Barr <jason@jasonsbarr.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

tl;dr: Do as you will; just don't be evil.
