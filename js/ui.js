class UI {
    /**
     * Populate datalist#states-list with states + D.C.
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
}