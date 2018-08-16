import React, { Component } from "react";
import "./nav.css";
import { NavLink, withRouter } from "react-router-dom";
import brandLogo from "../../assets/images/pf_cropped.png";

class Nav extends Component {
	constructor(props) {
		super(props);

		this.goBack = this.goBack.bind(this);
		this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
		this.state = {
			showNavMenu: false
		};
	}

	goBack() {
		if (this.props.history.length < 3) {
			this.props.history.replace("/");
		} else {
			this.props.history.goBack();
		}
	}

	toggleBurgerMenu() {
		this.setState({ showNavMenu: !this.state.showNavMenu });
	}

	render() {
		return (
			<nav  className = {this.props.location.pathname === "/" ? "navbar is-primary is-text-darker landing-burger" : "navbar is-primary is-text-darker"}>
				{this.props.location.pathname === "/" ? null : (
					<i className="material-icons back-button" onClick={this.goBack}>
						arrow_back_ios
					</i>
				)}
				
				{this.props.location.pathname === "/" ? null : (<NavLink to="/">
					<h1>pf</h1>
				</NavLink>)}

				
				

				<div
					className={this.state.showNavMenu ? "burger-menu close" : "burger-menu"}
					onClick={this.toggleBurgerMenu}
				>
					<span />
					<span />
					<span />
				</div>
				<ul className={this.state.showNavMenu ? "show" : ""} onClick={this.toggleBurgerMenu}>
					<li>
						<NavLink to="/">home</NavLink>
					</li>
					<li>
						<NavLink to="/itinerary">itinerary</NavLink>
					</li>
					<li>
						<NavLink to="/about">about</NavLink>
					</li>
					<li>
						<NavLink to="/team">team</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}

export default withRouter(Nav);
