/**
 * UI elements
 */
const W_FORM = document.getElementById('w-form');
const INPUT_CITY = document.getElementById('city');
const INPUT_STATE = document.getElementById('state');
const STATES_LIST = document.getElementById('states-list');

/**
 * Instantiate objects
 */
let map = new Map();
let wx = new Weather();
let ui = new UI();

/**
 * Event Listeners
 */
// Populate state list on DOM loaded
window.addEventListener('DOMContentLoaded', (e) => ui.listStates());

// Set City and state
W_FORM.addEventListener('submit', submitWeatherForm);

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

function submitWeatherForm(e) {
    e.preventDefault();

    // Get map coordinates
    map.fetchCoordinates(INPUT_CITY.value, INPUT_STATE.value)
    .then(coords => {
        wx.getWeather(coords)
        .then(data => console.log(data))
    })
    
    // Get weather info
    // wx.getWeather();
}
