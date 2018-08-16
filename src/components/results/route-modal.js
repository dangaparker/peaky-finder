import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./route-modal.css";
import boulder from "../../assets/images/icons/boulder.png";
import { showModal, setSelectedLocation, getRoutes } from "../../actions";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Loading from '../loading';

class RouteModal extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);

		this.state= {
			loading: false
		}
	}

	componentDidMount() {
		const searchTerm = queryString.parse(this.props.history.location.search);
		if (searchTerm.showModal) {
			this.props.toggleRouteModal(searchTerm.showModal == "true");
		}
	}

	handleClick() {
		this.props.toggleRouteModal(!this.props.show);
		const { pathname, search } = this.props.history.location;
		const queryParamsData = queryString.parse(search);
		const queryParams = queryString.stringify({ ...queryParamsData, showModal: !this.props.show });
		const newUrl = `${pathname}?${queryParams}`;
		this.props.history.replace(newUrl);
	}

	render() {
		console.log('Props dfa', this.props)
		if (!this.state.loading) {
			return (
				<div
					className={`routes-modal ${
						this.props.location ? (this.props.show ? "show" : "") : "hide-modal"
						}`}
				>
					<div onClick={this.handleClick}>
						<h1 className="is-text-lighter">
							{this.props.location ? this.props.location.name : ""}
						</h1>
					</div>
					<ul>
						{this.props.routes.map((route, i) => {
							let abbreviate = null;
							return (
								<li key={i}>
									<NavLink to={`/route-details/${route.id}`}>
										<p className="route-name">{route.name}</p>
										<p className="route-type">{route.type}</p>
										<p className="route-difficulty">{route.difficulty}</p>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}else {
			return <Loading />
		}
	}
}

const mapStateToProps = state => ({
	location: state.location.selectedLocation,
	routes: state.route.routes,
	show: state.routeModal.show
});

const mapDispatchToProps = dispatch => ({
	toggleRouteModal(show) {
		dispatch(showModal(show));
	},
	handleLocationSelect(location) {
		dispatch(setSelectedLocation(location));
		dispatch(getRoutes(location.ID));
	}
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(RouteModal)
);
