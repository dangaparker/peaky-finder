import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
	getSelectedRoute,
	addRouteToItinerary,
	removeRouteFromItinerary,
	getItenaryRoutes
} from "../../actions";
import ReactStars from "react-stars";
import queryString from "query-string";
import "./route-details.css";

class RouteDetails extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount() {
		this.props.getRouteData();
		//adding route array to local storage
		localStorage.setItem('localRouteArray', JSON.stringify([]))
	}

	handleClick() {
		//create a cookie or local storage here.
		const { itineraryRoutes, selectedRoute } = this.props;
		
		if (itineraryRoutes.find(route => route.id === selectedRoute.id) == null) {
			this.props.addToItinerary(this.props.selectedRoute);
			
			//pulling the route array from local storage and parsing it into an objoect
			var parsedRoutes = JSON.parse(localStorage.getItem('localRouteArray'))
			//pushing the selected route into the route array and then...
			parsedRoutes.push(selectedRoute)
			//thern putting the array back into to local storage
			localStorage.localRouteArray = JSON.stringify(parsedRoutes)
			
			
			// localStorage.setItem('itin', JSON.stringify(selectedRoute))
			// var localItin = JSON.parse(localStorage.getItem('itin'))
			// console.log('newitemfromlocal', localItin)
		} else {
			this.props.removeFromItinerary(this.props.selectedRoute);
		}
	}

	render() {

		let content;
		if (this.props.selectedRoute) {
			const {
				description,
				difficulty,
				location,
				name,
				pitches,
				star_votes,
				stars,
				type
			} = this.props.selectedRoute;
			content = (
				<div className="detail-container">
					<div className="thumbnail">
						<h1 className="title">{name}</h1>
						<h2 className="subtitle">{location}</h2>
						<div className="stars">
							<ReactStars value={Number(stars)} edit={false} count={5} size={18} color2={"#fff"} />
							<span>({star_votes})</span>
						</div>
					</div>
					<div className="details">
						<div className="bar">
							<div>
								<p>{type}</p>
								<p>type</p>
							</div>
							<div>
								<p>{pitches}</p>
								<p>pitches</p>
							</div>
							<div>
								<p>{difficulty}</p>
								<p>difficulty</p>
							</div>
						</div>
						<p className="description">{description}</p>
						<div className="btn-group">
							<button
								className="btn is-primary is-text-ligther itinerary-toggle add-itinerary-button top-btn"
								onClick={this.handleClick}
							>
								{this.props.itineraryRoutes.find(route => route.id === this.props.selectedRoute.id) == null ? "add to itinerary" : "remove from itinerary"}
							</button>
							<NavLink
								className="btn bottom-btn go-to-itinerary-button"
								to={`/itinerary?${queryString.stringify({
									routes: this.props.itineraryRoutes.map(route => route.id)
								})}`}
							>
								go to itinerary
							</NavLink>
						</div>
					</div>
				</div>
			);
		} else {
			content = null;
		}

		return content;
	}
}

const mapStateToProps = state => ({
	selectedRoute: state.route.selectedRoute,
	itineraryRoutes: state.itinerary.routes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getRouteData() {
		dispatch(getSelectedRoute(ownProps.match.params.routeID));
	},
	addToItinerary(route) {
		dispatch(addRouteToItinerary(route));
	},
	removeFromItinerary(route) {
		dispatch(removeRouteFromItinerary(route));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteDetails);
