import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./results-filter-btn.css";
import FilterModal from "./results-filter-modal";
import { getFilteredLocation, setRoutes, setSelectedLocation } from "../../actions";

class FilterBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showFilterModal: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleApplyClick = this.handleApplyClick.bind(this);
	}

	toggle(e) {
		this.setState(prevState => ({ showFilterModal: !prevState.showFilterModal }));
	}

	async handleApplyClick(formValues) {
		this.toggle();

		this.props.getFilteredLocation({
			...formValues,
			mapCenterLat: this.props.mapCenter.lat,
			mapCenterLong: this.props.mapCenter.lng
		});

		//clear selected location and its routes when applying filter
		this.props.clearRoutes();
		this.props.clearSelectedLocation();
	}

	render() {
		return (
			<div>
				<div className="filter">
					<button
						className="btn is-secondary is-very-small is-text-lighter filter-button"
						type="button"
						onClick={this.toggle}
					>
						FILTER
					</button>
				</div>
				<FilterModal
					apply={this.handleApplyClick}
					toggle={this.toggle}
					show={this.state.showFilterModal}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mapCenter: state.map.center,
});

const mapDispatchToProps = dispatch => {
	return {
		getFilteredLocation: filterParams => dispatch(getFilteredLocation(filterParams)),
		clearSelectedLocation: () => dispatch(setSelectedLocation(null)),
		clearRoutes: () => dispatch(setRoutes([]))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterBtn);
