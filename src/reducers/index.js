
import { createReducer } from "@reduxjs/toolkit";
import { PUT_COUNTRIES } from 'actions'

const rootReducer = createReducer({ countries: [] }, {
  [PUT_COUNTRIES] : (state = { countries: [] }, action) => {
        console.log("state =", state.countries.length);
        let countries = state.countries;
        if (countries[action.payload.alphabet] === undefined 
            || countries[action.payload.alphabet].length === 0 ) {
            countries[action.payload.alphabet] = action.payload.countries;
        }
        state.countries = countries;
        return state;
  }
});

export default rootReducer;