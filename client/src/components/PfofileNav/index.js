import React from "react";
import Auth from "../../utils/auth";
import Nav from "react-bootstrap/Nav";

function ProfileNav() {
	if (Auth.loggedIn()) {
		return (
			<Nav variant="tabs" defaultActiveKey="aboutme">
				<Nav.Item>
					<Nav.Link eventKey="aboutme">About Me | Rentals</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="orderhistory">Order History</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="myinfo">My Info</Nav.Link>
				</Nav.Item>
			</Nav>
		);
	}
}

export default ProfileNav;
