import React, { Component } from "react";
import { connect } from "react-redux";
import "./results-map.css";
import mapStyle from "./map-style.json";
import {
	setSelectedLocation,
	getRoutes,
	setMapCenter,
	setRoutes,
	getFilteredLocation
} from "../../actions";
import { getLocations } from "../../actions";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Loading from "../loading";
import NoResults from "./no-results-modal";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
	width: "100%",
	height: "100%"
};

class RouteMap extends Component {
	constructor(props) {
		super(props);
		this.map = null;
		this.ref = React.createRef();

		this.handleMarkerClick = this.handleMarkerClick.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
		this.centerMoved = this.centerMoved.bind(this);
	}

	async componentDidMount() {
		await this.props.getLocationsData();

		const params = queryString.parse(this.props.history.location.search);
		const { avgLat, avgLong, ID } = params;
		if (ID) {
			this.props.handleLocationSelect(params);
			this.props.setMapCenter(avgLat, avgLong);
		}
	}

	handleMapClick() {
		this.props.handleLocationSelect(null);
	}

	handleMarkerClick({ location }) {
		const routeIDs = location["Route IDs"];
		console.log("routeids", routeIDs);
		this.props.handleLocationSelect(location, routeIDs);
		const { avgLat, avgLong } = location;
		//this.props.setMapCenter(avgLat, avgLong);

		const { pathname, search } = this.props.history.location;
		const queryParamsData = queryString.parse(search);
		const queryParams = queryString.stringify({ ...queryParamsData, ...location });
		const newUrl = `${pathname}?${queryParams}`;
		this.props.history.replace(newUrl);
	}

	centerMoved(mapProps, map) {
		this.props.getFilteredLocation({
			...this.props.filterFormValues,
			mapCenterLat: map.center.lat(),
			mapCenterLong: map.center.lng()
		});
		//set the center on redux so the filter form can listen to it from props
		this.props.setMapCenter(map.center.lat(), map.center.lng());
	}

	render() {
		if (this.props.locations == null) {
			return <NoResults text="no results" />;
		}
		if (!this.props.locations.length) {
			return <Loading />;
		}
		return (
			<Map
				styles={mapStyle}
				google={this.props.google}
				zoom={10}
				initialCenter={this.props.mapCenter}
				center={this.props.mapCenter}
				onClick={this.handleMapClick}
				disableDefaultUI={true}
				onDragend={this.centerMoved}
			>
				{this.props.locations.map(location => {
					let { avgLat: lat, avgLong: lng } = location;

					return (
						<Marker
							label={{
								text: location.numRoutes.toString(),
								color: "white"
							}}
							onClick={this.handleMarkerClick}
							location={location}
							key={location.ID}
							position={{ lat: Number(lat), lng: Number(lng) }}
						/>
					);
				})}
			</Map>
		);
	}
}

const mapStateToProps = state => ({
	locations: state.location.locations,
	mapCenter: state.map.center,
	filterFormValues: state.form.filter
		? state.form.filter.values
		: {
				traditional: true,
				topRope: true,
				sport: true,
				boulder: true,
				rockDiffStart: "5.5",
				rockDiffEnd: "5.15d",
				boulderDiffStart: "V0",
				boulderDiffEnd: "V14"
		  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getLocationsData() {
		return dispatch(getLocations(ownProps.searchTerm));
	},
	handleLocationSelect(location = null, routesIds = null) {
		dispatch(setSelectedLocation(location));
		//if location is undefined or null get the routes from the server
		//if not just set the routes to an empty array so react doesnt complaine
		location ? dispatch(getRoutes(location.ID, routesIds)) : dispatch(setRoutes([]));
	},
	setMapCenter(lat, lng) {
		dispatch(setMapCenter(lat, lng));
	},
	getFilteredLocation: filterParams => dispatch(getFilteredLocation(filterParams))
});

RouteMap = GoogleApiWrapper({
	apiKey: "AIzaSyDN78Uy_AYEXBfiTgSQ_O7Bg41PwUczn10",
	LoadingContainer: Loading
})(RouteMap);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(RouteMap)
);
