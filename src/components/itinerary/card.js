import React, { Component } from "react";

import { connect } from 'react-redux';
import { removeRouteFromItinerary } from '../../actions'

import stockPhoto from "../../assets/images/climb_no_image.jpeg";





class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expandCard: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleXClick = this.handleXClick.bind(this);
	}

	componentDidMount() {
	}

	handleClick() {
		this.setState({
			expandCard: !this.state.expandCard
		});
	}
	handleXClick() {
		this.props.removeRoute(this.props.route);
	}

	render() {
		let img = this.props.route.image;
		if (img === '') {
			img = stockPhoto;
		}
		return (
			<div className={this.state.expandCard ? "card expand" : "card"}>
				<div className="card-image" style={{ backgroundImage: `url(${img})` }}>
					<div className='top-left-text'><p>{this.props.route.difficulty}</p></div>
					<div className='top-right-x' onClick={this.handleXClick}><p>X</p></div>
				</div>
				<div onClick={this.handleClick} className="card-content">
					<div className="card-content-left">
						<h1>{this.props.route.name}</h1>
						<h2>{this.props.route.location}</h2>
					</div>
					<div className="card-content-right">
						<i className="down-arrow material-icons">keyboard_arrow_down</i>
					</div>
				</div>
				<div className="card-details">
					{this.props.route.description}
				</div>
			</div>

		);
	}
}



function mapDispatchToProps(dispatch) {
	return {
		removeRoute(routeID) {
			dispatch(removeRouteFromItinerary(routeID))
		}
	}
}

export default connect(null, mapDispatchToProps)(Card);
