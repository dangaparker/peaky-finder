import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import types from "./actions/types";

import App from "./components/app";
import rootReducer from "./reducers";

//persist the itineary locally
const persist = store => next => action => {
	if (action.type === types.ADD_ROUTE_TO_ITINERARY) {
		if (localStorage.getItem("routes") == null) {
			localStorage.setItem("routes", JSON.stringify([action.payload]));
		} else {
			const routes = JSON.parse(localStorage.getItem("routes"));
			routes.push(action.payload);
			localStorage.setItem("routes", JSON.stringify(routes));
		}
	}
	if(action.type === types.REMOVE_ROUTE_FROM_ITINERARY) {
		if(localStorage.getItem("routes") != null) {
			const routes = JSON.parse(localStorage.getItem("routes")).filter(route => route.id !== action.payload.id) 
			localStorage.setItem("routes", JSON.stringify(routes));
		}
	}
	return next(action);
};

//if localstorage has routes get it from there if not jsut empty array
const store = createStore(
	rootReducer,
	{
		itinerary: {
			routes: JSON.parse(localStorage.getItem("routes")) || []
		}
	},
	compose(applyMiddleware(persist, thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
