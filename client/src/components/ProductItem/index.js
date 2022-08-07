import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles.css";

// React Components
import { Component } from "react";

export default class Card extends Component {
	render() {
		let img;
		if (this.props.image) {
			img = <img src={"/images/" + this.props.image} alt={this.props.name} />;
		} else {
			img = (
				<img
					src="https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
					alt=""
				/>
			);
		}

		return (
			<div className="Card">
				<Link to={`/products/${this.props._id}`}>{img}</Link>
				<div className={"Card-body " + this.props.color}>
					<h2>
						{this.props.name} &nbsp; $
						{(Math.round(this.props.price * 100) / 100).toFixed(2)} per day
					</h2>
					<p>{this.props.description}</p>
					{/* <h5>
						${(Math.round(this.props.price * 100) / 100).toFixed(2)} per day
					</h5> */}
				</div>
			</div>
		);
	}
}
