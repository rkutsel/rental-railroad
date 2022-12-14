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
      img = <img src={this.props.image} alt={this.props.name} />;
    } else {
      img = (
        <img
          src="https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
          alt=""
        />
      );
    }

    let overlay;
    let ownership;

    if (this.props.isOwner) {
      // overlay = null;
      overlay = null;
      ownership = (
        <div className="owner-div d-flex justify-content-center align-items-center">
          <h1>⭐</h1>
        </div>
      );
    } else if (this.props.isRented) {
      overlay = (
        <div className="overlay-div d-flex justify-content-center align-items-center">
          <h1>Rented</h1>
        </div>
      );
      ownership = null;
    } else {
      overlay = null;
      ownership = null;
    }

    return (
      <div className="Card">
        {overlay}
        {ownership}
        <Link to={`/products/${this.props._id}`}>{img}</Link>
        <div className={"Card-body " + this.props.color}>
          <div className="d-flex justify-content-between">
            <h2 className="d-inline">{this.props.name}</h2>
            <span>
              ${(Math.round(this.props.price * 100) / 100).toFixed(2)} per day
            </span>
          </div>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
