import types from "../actions/types";

const DEFAULT_STATE = {
	routes: []
};

function itineraryReducer(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case types.ADD_ROUTE_TO_ITINERARY:
			return { ...state, routes: [...state.routes, action.payload] };
		case types.REMOVE_ROUTE_FROM_ITINERARY:
			return { ...state, routes: state.routes.filter(route => route.id !== action.payload.id) };
		case types.REPLACE_ROUTES_IN_ITINERARY:
			return { ...state, routes: action.payload };
		default:
			return state;
	}
}

export default itineraryReducer;
