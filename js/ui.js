class UI {
    /**
     * Populate datalist#states-list with states + D.C.
     * 
     * @deprecated // Don't need it anymore since switching to single search box
     */
    async listStates() {
        // Get array of states from data/states.json
        let statesResponse = await fetch('data/states.json');
        let statesObj = await statesResponse.json();
        let statesList = statesObj.states;

        // Populate datalist with states
        statesList.forEach(state => {
            let option = document.createElement('option');
            
            option.textContent = option.value = state;
            
            STATES_LIST.appendChild(option);
        });
    }

    /**
     * Add options returned from MapQuest API to search datalist
     * 
     * @param {Object} options 
     */
    listOptions(options) {
        options.forEach(option => {
            let item = document.createElement('option');
            
            item.value = option.displayString;

            SEARCH_LIST.appendChild(item);
        });
    }

    renderData(data) {
        // Show location
        W_LOCATION.textContent = map.location;

        // Show icon
        W_ICON.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        W_ICON.alt = `${data.weather[0].description} weather icon`;

        // Show summary
        let temp = parseInt(wx.kelToF(data.main.temp));
        W_DESC.innerHTML = `${data.weather[0].main} and ${temp}&deg;`;

        // Show humidity
        W_HUMIDITY.textContent = `Relative humidity is ${data.main.humidity}%`;

        // Show barometric pressure
        let pressure = wx.hPaToInHg(data.main.pressure).toFixed(2);
        W_PRESSURE.textContent = `Barometric pressure is ${pressure} inHg`;

        // Show wind speed and direction
        let windSpeed = wx.msToMph(data.wind.speed).toFixed(1);
        W_WIND.innerHTML = `Wind is blowing at ${windSpeed} miles/hour from direction of ${data.wind.deg.toFixed(0)}&deg;`;

        // Show cloud cover in percent
        W_CLOUD_COVER.textContent = `Cloud cover is ${data.clouds.all}%`
    }

    // Show spinner while loading
    toggleSpinner() {
        if (!W_DETAILS.classList.contains('loading')) {
            W_DETAILS.classList.add('loading');
            // position: relative to position loader container
            document.body.style.position = 'relative';

            // Create div and assign class for styling 
            let div = document.createElement('div');
            div.className = 'loader-container';
            div.id = 'loader-container';

            // Create img for loader
            let loader = document.createElement('img');
            loader.alt = 'Loading...';
            loader.title = 'Loading...';
            loader.src = 'img/loader.gif';
            loader.width = 48;
            loader.classList = 'loader';

            // Add loader to container
            div.appendChild(loader);

            // Add div to page
            document.body.appendChild(div);
        } else {
            W_DETAILS.classList.remove('loading');
            document.getElementById('loader-container').remove();
        }
    }

    showError(msg) {
        if (document.getElementById('error')) {
            document.getElementById('error').remove();
        }
        let err = document.createElement('div');
        err.classList = 'alert alert-danger col-md-6 mx-auto mt-5';
        err.id = 'error';
        err.textContent = msg;
        document.querySelector('.container').insertBefore(err, document.querySelector('.row'));
    }
}
