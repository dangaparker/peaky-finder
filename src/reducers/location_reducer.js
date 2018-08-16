import types from "../actions/types";

const DEFAULT_STATE = {
  locations: [],
  selectedLocation: null
};

function locationReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.SET_LOCATIONS:
      return { ...state, locations: action.payload };
    case types.SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.payload };
    case types.CLEAR_LOCATION_DATA:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
}


export default locationReducer;
