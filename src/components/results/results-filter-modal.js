import React, { Component } from "react";
import FilterBtn from "./results-filter-btn";
import "./results-filter-modal.css";
import axios from "axios";
import queryString from "query-string";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import filterOptions from "./filterOptions";

const renderCheckBox = ({ label, input, meta: { touched, error }, type }) => {
	return (
		<div className="checkbox-container checkbox-hover">
			<input className="" {...input} type={type} autoComplete="off" />
			<label className="">{label}</label>
		</div>
	);
};

class FilterModal extends Component {
	render() {
		const { handleSubmit } = this.props;
		return (
			<div className={`filter-modal-shadow ${this.props.show ? "show" : ""}`}>
				<div className="filter-modal-body">
					<div className="filter-modal-header">
						<h1 className="text-center">Filter</h1>
						<button className="btn is-secondary is-very-small" onClick={this.props.toggle}>
							DONE
						</button>
					</div>
					<form onSubmit={handleSubmit(this.props.apply)} className="filter-form">
						<h2>Categories</h2>
						<div className="categories">
							<Field
								name="traditional"
								label="Traditional"
								component={renderCheckBox}
								type="checkbox"
							/>
							<Field name="topRope" label="Top Rop" component={renderCheckBox} type="checkbox" />
							<Field name="sport" label="Sport" component={renderCheckBox} type="checkbox" />
							<Field name="boulder" label="Boulder" component={renderCheckBox} type="checkbox" />
						</div>
						<h2>Rock difficulty</h2>
						<div className="drop-menu">
							<Field className="drop-menu-style" name="rockDiffStart" component="select">
								{filterOptions.rockDifficulty.map((difficulty, i) => {
									return (
										<option key={i} value={difficulty}>
											{difficulty}
										</option>
									);
								})}
							</Field>
							<p>to</p>
							<Field className="drop-menu-style" name="rockDiffEnd" component="select">
								{filterOptions.rockDifficulty.map((difficulty, i) => {
									return (
										<option key={i} value={difficulty}>
											{difficulty}
										</option>
									);
								})}
							</Field>
						</div>
						<h2>Boulder difficulty</h2>
						<div className="drop-menu">
							<Field className="drop-menu-style" name="boulderDiffStart" component="select">
								{filterOptions.boulderDifficulty.map((difficulty, i) => {
									return (
										<option key={i} value={difficulty}>
											{difficulty}
										</option>
									);
								})}
							</Field>
							<p>to</p>
							<Field className="drop-menu-style" name="boulderDiffEnd" component="select">
								{filterOptions.boulderDifficulty.map((difficulty, i) => {
									return (
										<option key={i} value={difficulty}>
											{difficulty}
										</option>
									);
								})}
							</Field>
						</div>
						<div className="btn-group">
							<button type="submit" className="btn is-secondary is-small">
								APPLY
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

FilterModal = reduxForm({
	form: "filter",
	initialValues: {
		traditional: true,
		topRope: true,
		sport: true,
		boulder: true,
		rockDiffStart: "5.5",
		rockDiffEnd: "5.15d",
		boulderDiffStart: "V0",
		boulderDiffEnd: "V14"
	}
})(FilterModal);

export default connect(
	mapStateToProps,
	null
)(FilterModal);
