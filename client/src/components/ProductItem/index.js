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

    let overlay;
    if (this.props.isRented) {
      overlay = (
        <div class="overlay-div d-flex justify-content-center align-items-center">
          <h1>Rented</h1>
        </div>
      );
    } else {
      overlay = null;
    }

    return (
      <div className="Card">
        {overlay}
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
