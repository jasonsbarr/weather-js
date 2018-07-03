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
}