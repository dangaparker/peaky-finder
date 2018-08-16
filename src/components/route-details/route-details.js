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
	}

	handleClick() {
		//create a cookie or local storage here.
		const { itineraryRoutes, selectedRoute } = this.props;
		if (itineraryRoutes.find(route => route.id === selectedRoute.id) == null) {
			this.props.addToItinerary(this.props.selectedRoute);
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
