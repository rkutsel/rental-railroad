import React from "react";
import Auth from "../../utils/auth";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderTable from "../OrderTable";
import Container from "react-bootstrap/Container";

function ProfileNav() {
	if (Auth.loggedIn()) {
		return (
			<Container>
				<Row className="justify-content-center">
					<Col xs={7}>
						<Container>
							<Row className="d-flex justify-content-center">
								<Col xs={5}>
									<h3>Profile View</h3>
								</Col>
							</Row>
						</Container>
						<Nav variant="tabs" defaultActiveKey="aboutme">
							<Nav.Item>
								<Nav.Link eventKey="aboutme">About Me | Rentals</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="orderhistory">Order History</Nav.Link>
								<OrderTable/>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="myinfo">My Info</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ProfileNav;
