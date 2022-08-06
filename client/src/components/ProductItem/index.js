import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles.css";

// React Components
import { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <Link to={`/products/${this.props._id}`}>
          <img
            src="https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
            alt=""
          />
        </Link>
        <div className={"card-body " + this.props.color}>
          <h2>{this.props.name}</h2>
          <p>{this.props.description}</p>
          <h5>
            ${(Math.round(this.props.price * 100) / 100).toFixed(2)} per day
          </h5>
        </div>
      </div>
    );
  }
}
