/**
 * UI elements
 */
const W_FORM = document.getElementById('w-form');
const INPUT_SEARCH = document.getElementById('search');
const SEARCH_LIST = document.getElementById('search-list');
const W_LOCATION = document.getElementById('w-location');
const W_DESC = document.getElementById('w-desc');
const W_STRING = document.getElementById('w-string');
const W_ICON = document.getElementById('w-icon');
const W_DETAILS = document.getElementById('w-details');
const W_HUMIDITY = document.getElementById('w-humidity');
const W_PRESSURE = document.getElementById('w-pressure');
const W_WIND = document.getElementById('w-wind');
const W_CLOUD_COVER = document.getElementById('w-cloud-cover');

/**
 * Instantiate objects
 */
let map = new Map();
let wx = new Weather();
let ui = new UI();

/**
 * Event Listeners
 */
// Get user's current location info on DOMContentLoaded
window.addEventListener('DOMContentLoaded', getInitWeather);

// Query MQ Search Ahead API on INPUT_SEARCH submit
let searchDelay;
INPUT_SEARCH.addEventListener('keyup', (e) => {
    clearTimeout(searchDelay);

    if (INPUT_SEARCH.value !== '' && INPUT_SEARCH.value.length > 2) {
        searchDelay = setTimeout(() => showOptions(INPUT_SEARCH.value), 400);
    }
})

// Get weather on submit W_FORM
W_FORM.addEventListener('submit', getWeather);

// TURNS OUT I DON'T NEED THIS
// async function nameInCitiesList(cityInput) {
//     // Fetch list of cities
//     let citiesListResponse = await fetch('data/cities.json');
//     let cities = await citiesListResponse.json();

//     // See if city name is in list
//     cities.some((city, index, array) => {
//         if (city.name === cityInput) {
//             wx.cities = cities;
//             return true;
//         } else if (index === (array.length - 1)) {
//             throw new Error('City not in list');
//         }
//     });
// }

function getWeather(e) {
    e.preventDefault();
    ui.toggleSpinner();

    // Get map coordinates
    map.fetchCoordinates(INPUT_SEARCH.value)
    .then(coords => {
        wx.fetchWeather(coords.lat, coords.lng)
        .then(data => {
            ui.renderData(data);
            INPUT_SEARCH.value = '';
            clearTimeout(searchDelay);
            ui.toggleSpinner();
        })
        .catch(error => {
            ui.showError("The data could not be found. Please try again.")
            ui.toggleSpinner();
        });
    })
    .catch(error => {
        ui.showError("The data could not be found. Please try again.")
        ui.toggleSpinner();
    });
}

function showOptions(query) {
    // Clear datalist
    SEARCH_LIST.innerHTML = '';

    // Get options from MapQuest API
    map.fetchOptions(query)
    // Populate datalist with options
    .then(options => ui.listOptions(options));
}

function getInitWeather() {
    ui.toggleSpinner();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            wx.fetchWeather(position.coords.latitude, position.coords.longitude)
            .then(data => {
                map.location = 'Your current location';
                ui.renderData(data);
                ui.toggleSpinner();
            })
            .catch(() => {
                ui.showError('The data could not be found. Please reload the page and try again.');
                ui.toggleSpinner();
            });
        });
    }
}
