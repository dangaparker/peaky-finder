import { combineReducers } from "redux";

import itineraryReducer from './itinerary_reducer';
import locationReducer from "./location_reducer";
import routeReducer from "./route_reducer";
import searchTermReducer from "./search_term_reducer";
import mapReducer from "./map_reducer";

const rootReducer = combineReducers({
  location: locationReducer,
  map: mapReducer,
  route: routeReducer,
  searchTerm: searchTermReducer,
  itinerary: itineraryReducer
});

export default rootReducer;
