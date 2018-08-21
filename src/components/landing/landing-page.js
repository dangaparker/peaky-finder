import React, { Component } from "react";
import { connect } from "react-redux";

import { setSearchTerm, setSelectedLocation, showModal, setMapCenter } from "../../actions";
import "./landing.css";
import Loading from "../loading";
import logo from "../../assets/images/peaky_text.png";


function validateInput(searchTerm){
	return {
		searchTerm: searchTerm.length === 0
	}
}

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			loading: false,
			
			touched: {
				searchTerm: false
			}
		};
	}



	componentDidMount() {
		this.props.clearSearchTerm();
		this.props.clearLocation();
		this.props.hideRouteModal();
		this.props.clearMapCenter();
	}

	handleFormSubmit(event) {
		event.preventDefault();
		console.log('props', this.props)
		const { searchTerm } = this.props;
		if(searchTerm === ""){
			return;
		}
		this.props.history.push(`/results?searchTerm=${searchTerm}`);
	}
	canbeSubmitted(){
		const errors = validateInput(searchTerm)
		const isDisabled = Object.keys(errors).some(x => errors[x]);
		return !isDisabled;
	}
	
	handleBlur = (field) => (event) => {
		this.setState({
		  touched: { ...this.state.touched, [field]: true },
		});
	  }

	render() {
		
		const { searchTerm, handleSearchTermChange } = this.props;
		const errors = validateInput(searchTerm)
		const isDisabled = Object.keys(errors).some(x => errors[x]);
		const shouldMarkError = (field) => {
			const hasError = errors[field];
			const shouldShow = this.state.touched[field];
			
			return hasError ? shouldShow : false;
		  };
		// const isEnabled = searchTerm.length > 0 
		if (!this.state.loading) {
			return (
				<div className="landing-page">
				<img className = "peaky-logo" src={logo} />
					<form onSubmit={this.handleFormSubmit}>
						
						<input 
							autoComplete="off"
							name="location"
							className={shouldMarkError('searchTerm') ? "landing-page-input search-error" : "landing-page-input"}
							type="text"
							placeholder="Enter City or Zip"
							onChange={handleSearchTermChange}
							value={searchTerm}
							onBlur={this.handleBlur('searchTerm')}
						/>
						<button
							// disabled={isDisabled}
							type="submit"
							className={searchTerm ? "btn is-bg-grey is-primary is-fullwidth is-text-lighter landing-button" : "btn is-bg-grey  is-fullwidth is-text-lighter landing-button-error"}
						>
							go
						</button>
						{/* {!searchTerm ? <p>enter value</p> : ""} */}
					</form>
				
				</div>
			);
		} else {
			return <Loading />;
		}
	}
}

const mapStateToProps = state => {
	return {
		searchTerm: state.searchTerm
	};
};

const mapDispatchToProps = dispatch => ({
	handleSearchTermChange(event) {
		dispatch(setSearchTerm(event.target.value));
	},
	clearSearchTerm() {
		dispatch(setSearchTerm(""));
	},
	clearLocation() {
		dispatch(setSelectedLocation(null));
	},
	hideRouteModal() {
		dispatch(showModal(false));
	},
	clearMapCenter() {
		dispatch(setMapCenter(0));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LandingPage);
